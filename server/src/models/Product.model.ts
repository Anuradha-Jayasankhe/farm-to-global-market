import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: 'crops' | 'processed' | 'accessories';
  subcategory?: string;
  
  // Seller information
  seller: mongoose.Types.ObjectId;
  sellerName: string;
  
  // Pricing
  price: number;
  currency: string;
  unit: string;
  minOrder: number;
  maxOrder?: number;
  
  // Inventory
  stock: number;
  isInStock: boolean;
  
  // Images
  images: string[];
  thumbnail: string;
  
  // Location
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // Classification
  isOrganic: boolean;
  isCertified: boolean;
  certifications?: string[];
  
  // Marketplace type
  marketType: 'local' | 'global' | 'accessories';
  
  // Shipping
  shipping: {
    available: boolean;
    cost?: number;
    estimatedDays?: number;
    method?: string;
  };
  
  // Stats
  views: number;
  orders: number;
  rating: number;
  reviews: number;
  
  // Status
  isActive: boolean;
  isApproved: boolean;
  isFeatured: boolean;
  
  // SEO
  tags: string[];
  slug: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [200, 'Name cannot be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['crops', 'processed', 'accessories'],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],
  },
  currency: {
    type: String,
    default: 'USD',
  },
  unit: {
    type: String,
    required: [true, 'Please add a unit (kg, lb, piece, etc.)'],
  },
  minOrder: {
    type: Number,
    default: 1,
  },
  maxOrder: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image'],
    validate: [arrayMinLength, 'At least one image is required'],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  isOrganic: {
    type: Boolean,
    default: false,
  },
  isCertified: {
    type: Boolean,
    default: false,
  },
  certifications: [String],
  marketType: {
    type: String,
    enum: ['local', 'global', 'accessories'],
    required: true,
  },
  shipping: {
    available: {
      type: Boolean,
      default: false,
    },
    cost: Number,
    estimatedDays: Number,
    method: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  orders: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  slug: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

// Custom validator
function arrayMinLength(val: string[]) {
  return val.length > 0;
}

// Create slug from name before saving
ProductSchema.pre('save', function(next: any) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() + '-' + Date.now();
  }
  next();
});

// Update stock status
ProductSchema.pre('save', function(next: any) {
  this.isInStock = this.stock > 0;
  next();
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, marketType: 1 });
ProductSchema.index({ seller: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
