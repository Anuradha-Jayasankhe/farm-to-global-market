import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender?: mongoose.Types.ObjectId;
  
  type: 'order' | 'payment' | 'community' | 'ai' | 'system' | 'promotion';
  title: string;
  message: string;
  
  data?: {
    orderId?: string;
    productId?: string;
    postId?: string;
    consultationId?: string;
    link?: string;
    actionRequired?: boolean;
  };
  
  isRead: boolean;
  readAt?: Date;
  
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['order', 'payment', 'community', 'ai', 'system', 'promotion'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    orderId: String,
    productId: String,
    postId: String,
    consultationId: String,
    link: String,
    actionRequired: Boolean,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
  },
}, {
  timestamps: true,
});

// Indexes
NotificationSchema.index({ recipient: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
