import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'farmer' | 'buyer' | 'local_buyer' | 'global_buyer' | 'processor' | 'processing_partner' | 'ai_consultant' | 'logistics_partner' | 'accessories_seller' | 'admin';
  avatar?: string;
  
  // Profile details
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // Farmer specific
  farmDetails?: {
    farmName?: string;
    farmSize?: number;
    farmType?: string;
    crops?: string[];
  };
  
  // Subscription
  subscription: {
    plan: 'free' | 'basic' | 'pro' | 'premium';
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
  };
  
  // Account status
  isEmailVerified: boolean;
  isActive: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  
  // Stats
  rating?: number;
  totalOrders: number;
  totalSales: number;
  
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  getEmailVerificationToken(): string;
  getResetPasswordToken(): string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['farmer', 'buyer', 'local_buyer', 'global_buyer', 'processor', 'processing_partner', 'ai_consultant', 'logistics_partner', 'accessories_seller', 'admin'],
    default: 'farmer',
  },
  avatar: {
    type: String,
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  farmDetails: {
    farmName: String,
    farmSize: Number,
    farmType: String,
    crops: [String],
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'pro', 'premium'],
      default: 'free',
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '10'));
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password
UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(): string {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    jwtSecret,
    { expiresIn: '7d' }
  );
};

// Generate email verification token
UserSchema.methods.getEmailVerificationToken = function(): string {
  const verificationToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  this.emailVerificationToken = verificationToken;
  return verificationToken;
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function(): string {
  const resetToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  return resetToken;
};

export const User = mongoose.model<IUser>('User', UserSchema);
