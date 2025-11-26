import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  
  // Buyer information
  buyer: mongoose.Types.ObjectId;
  buyerName: string;
  buyerEmail: string;
  
  // Order items
  items: Array<{
    product: mongoose.Types.ObjectId;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    seller: mongoose.Types.ObjectId;
    sellerName: string;
    image: string;
  }>;
  
  // Pricing
  subtotal: number;
  shippingCost: number;
  tax: number;
  platformCommission: number;
  total: number;
  currency: string;
  
  // Shipping Address
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  
  // Payment
  payment: {
    method: 'card' | 'paypal' | 'bank_transfer' | 'cod';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    paidAt?: Date;
  };
  
  // Order Status
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  // Tracking
  tracking: {
    carrier?: string;
    trackingNumber?: string;
    estimatedDelivery?: Date;
    actualDelivery?: Date;
  };
  
  // Timestamps for status changes
  confirmedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  
  // Notes
  buyerNotes?: string;
  sellerNotes?: string;
  adminNotes?: string;
  
  // Commission breakdown per seller
  commissions: Array<{
    seller: mongoose.Types.ObjectId;
    amount: number;
    rate: number;
  }>;
  
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
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
    image: {
      type: String,
      required: true,
    },
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  platformCommission: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  shippingAddress: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
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
    zipCode: {
      type: String,
      required: true,
    },
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'cod'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: String,
    paidAt: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  tracking: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
  },
  confirmedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  buyerNotes: String,
  sellerNotes: String,
  adminNotes: String,
  commissions: [{
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  }],
}, {
  timestamps: true,
});

// Generate order number before saving
OrderSchema.pre('save', function(next: any) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ORD-${year}${month}${day}-${random}`;
  }
  next();
});

// Indexes
OrderSchema.index({ buyer: 1 });
OrderSchema.index({ 'items.seller': 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
