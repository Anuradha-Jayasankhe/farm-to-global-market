import mongoose, { Document, Schema } from 'mongoose';

export interface ICommunityPost extends Document {
  author: mongoose.Types.ObjectId;
  authorName: string;
  authorAvatar?: string;
  
  content: string;
  title?: string;
  
  images?: string[];
  
  category: 'question' | 'tip' | 'success_story' | 'news' | 'discussion';
  tags: string[];
  
  likes: mongoose.Types.ObjectId[];
  likesCount: number;
  
  comments: Array<{
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: Date;
  }>;
  commentsCount: number;
  
  views: number;
  shares: number;
  
  isEdited: boolean;
  isPinned: boolean;
  isReported: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const CommunityPostSchema = new Schema<ICommunityPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: String,
  content: {
    type: String,
    required: [true, 'Post content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters'],
  },
  title: {
    type: String,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  images: [String],
  category: {
    type: String,
    enum: ['question', 'tip', 'success_story', 'news', 'discussion'],
    required: true,
  },
  tags: [String],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: String,
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  commentsCount: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isReported: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Update counts automatically
CommunityPostSchema.pre('save', function(next: any) {
  this.likesCount = this.likes.length;
  this.commentsCount = this.comments.length;
  next();
});

// Indexes
CommunityPostSchema.index({ author: 1 });
CommunityPostSchema.index({ category: 1 });
CommunityPostSchema.index({ createdAt: -1 });
CommunityPostSchema.index({ likesCount: -1 });

export const CommunityPost = mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema);
