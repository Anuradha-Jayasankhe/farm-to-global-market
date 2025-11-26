import mongoose, { Document, Schema } from 'mongoose';

export interface IAIConsultation extends Document {
  user: mongoose.Types.ObjectId;
  consultationType: 'crop_planning' | 'pest_detection' | 'value_booster' | 'packaging_design';
  
  // Input data
  input: {
    location?: {
      city: string;
      state: string;
      country: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    soilType?: string;
    climate?: string;
    farmSize?: number;
    budget?: number;
    cropType?: string;
    imageUrl?: string;
    productDetails?: any;
    customData?: any;
  };
  
  // AI Response
  response: {
    recommendations?: Array<{
      name: string;
      confidence: number;
      details: any;
    }>;
    analysis?: string;
    suggestions?: string[];
    estimatedROI?: number;
    processedProducts?: Array<{
      name: string;
      value: number;
      processingCost: number;
      profitMargin: number;
    }>;
    pestIdentification?: {
      pestName: string;
      scientificName: string;
      severity: 'low' | 'medium' | 'high';
      confidence: number;
      treatments: string[];
      preventiveMeasures: string[];
    };
    packagingDesign?: {
      designUrl: string;
      specifications: any;
      compliance: string[];
      estimatedCost: number;
    };
    rawResponse?: any;
  };
  
  // Metadata
  processingTime: number; // in milliseconds
  aiModel?: string;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
  
  // User actions
  feedback?: {
    rating: number;
    comment: string;
    helpful: boolean;
  };
  
  isSaved: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const AIConsultationSchema = new Schema<IAIConsultation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  consultationType: {
    type: String,
    enum: ['crop_planning', 'pest_detection', 'value_booster', 'packaging_design'],
    required: true,
  },
  input: {
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    soilType: String,
    climate: String,
    farmSize: Number,
    budget: Number,
    cropType: String,
    imageUrl: String,
    productDetails: Schema.Types.Mixed,
    customData: Schema.Types.Mixed,
  },
  response: {
    recommendations: [{
      name: String,
      confidence: Number,
      details: Schema.Types.Mixed,
    }],
    analysis: String,
    suggestions: [String],
    estimatedROI: Number,
    processedProducts: [{
      name: String,
      value: Number,
      processingCost: Number,
      profitMargin: Number,
    }],
    pestIdentification: {
      pestName: String,
      scientificName: String,
      severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
      },
      confidence: Number,
      treatments: [String],
      preventiveMeasures: [String],
    },
    packagingDesign: {
      designUrl: String,
      specifications: Schema.Types.Mixed,
      compliance: [String],
      estimatedCost: Number,
    },
    rawResponse: Schema.Types.Mixed,
  },
  processingTime: {
    type: Number,
    required: true,
  },
  aiModel: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  error: String,
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    helpful: Boolean,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes
AIConsultationSchema.index({ user: 1 });
AIConsultationSchema.index({ consultationType: 1 });
AIConsultationSchema.index({ createdAt: -1 });
AIConsultationSchema.index({ status: 1 });

export const AIConsultation = mongoose.model<IAIConsultation>('AIConsultation', AIConsultationSchema);
