// Core Type Definitions for Farm-to-Global-Market Platform

// ========== User Types ==========
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'farmer' | 'buyer' | 'processor' | 'admin';

export interface Farmer extends User {
  role: 'farmer';
  farmDetails: FarmDetails;
  subscriptionTier: SubscriptionTier;
  earnings: number;
  totalSales: number;
}

export interface Buyer extends User {
  role: 'buyer';
  buyerType: 'local' | 'international';
  companyName?: string;
  country: string;
}

export interface Processor extends User {
  role: 'processor';
  processingCapabilities: string[];
  certifications: string[];
  rating: number;
  completedOrders: number;
}

export interface FarmDetails {
  location: Location;
  landSize: number;
  landSizeUnit: 'acres' | 'hectares';
  soilType?: string;
  currentCrops: string[];
  farmingType: 'organic' | 'conventional' | 'mixed';
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ========== Product Types ==========
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  minOrder: number;
  sellerId: string;
  seller: User;
  status: ProductStatus;
  tags: string[];
  isExportQuality?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'fruits'
  | 'vegetables'
  | 'grains'
  | 'spices'
  | 'dehydrated'
  | 'powdered'
  | 'packaged'
  | 'organic'
  | 'accessories'
  | 'tools'
  | 'seeds'
  | 'fertilizers';

export type ProductStatus = 'available' | 'out-of-stock' | 'pending' | 'archived';

export interface ExportProduct extends Product {
  exportReady: true;
  certifications: Certification[];
  complianceCountries: string[];
  shippingInfo: ShippingInfo;
}

export interface Certification {
  name: string;
  issuedBy: string;
  validUntil: Date;
  certificateUrl?: string;
}

export interface ShippingInfo {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  packagingType: string;
  shippingTime: string;
}

// ========== AI Types ==========
export interface CropRecommendation {
  cropName: string;
  scientificName: string;
  suitabilityScore: number; // 0-100
  estimatedYield: number;
  estimatedProfit: number;
  growingDuration: number; // days
  waterRequirement: 'low' | 'medium' | 'high';
  fertilizers: FertilizerPlan[];
  bestPlantingMonth: string[];
  harvestMonth: string[];
  challenges: string[];
  marketDemand: 'low' | 'medium' | 'high' | 'very-high';
}

export interface FertilizerPlan {
  name: string;
  quantity: string;
  applicationTime: string;
  frequency: string;
}

export interface PestDetection {
  pestName: string;
  scientificName: string;
  confidence: number; // 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedArea: string;
  symptoms: string[];
  treatment: Treatment[];
  preventiveMeasures: string[];
}

export interface Treatment {
  method: string;
  product?: string;
  dosage?: string;
  frequency: string;
  duration: string;
  organicAlternative?: string;
}

export interface ValueBoosterSuggestion {
  id: string;
  productName: string;
  description: string;
  estimatedProfit: number;
  profitIncrease: number; // percentage
  processingType: ProcessingType;
  processingTime: number; // days
  requiredQuantity: number;
  outputQuantity: number;
  certifications: string[];
  targetMarkets: string[];
  processors: Processor[];
}

export type ProcessingType = 
  | 'dehydration'
  | 'freeze-drying'
  | 'powdering'
  | 'packaging'
  | 'fermentation'
  | 'vacuum-packing';

export interface PackagingDesign {
  id: string;
  productName: string;
  brandName: string;
  logoUrl: string;
  labelUrl: string;
  colors: string[];
  style: 'modern' | 'organic' | 'premium' | 'rustic' | 'minimal';
  nutritionChart: NutritionInfo;
  barcodeUrl?: string;
  complianceLabels: string[];
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  vitamins: { [key: string]: string };
  minerals: { [key: string]: string };
}

// ========== Order Types ==========
export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyer: User;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  shippingAddress: Location;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface ProcessingOrder {
  id: string;
  farmerId: string;
  processorId: string;
  rawProduct: string;
  rawQuantity: number;
  targetProduct: string;
  expectedOutput: number;
  status: ProcessingStatus;
  startDate: Date;
  expectedCompletionDate: Date;
  actualCompletionDate?: Date;
  cost: number;
  notes?: string;
}

export type ProcessingStatus = 
  | 'pending'
  | 'accepted'
  | 'in-progress'
  | 'quality-check'
  | 'completed'
  | 'rejected';

// ========== Subscription Types ==========
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'premium';

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  features: string[];
  status: 'active' | 'cancelled' | 'expired';
}

// ========== Community Types ==========
export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  likes: number;
  createdAt: Date;
}

// ========== Analytics Types ==========
export interface FarmAnalytics {
  totalRevenue: number;
  totalOrders: number;
  activeListings: number;
  conversionRate: number;
  topProducts: ProductPerformance[];
  revenueByMonth: { month: string; revenue: number }[];
  profitMargin: number;
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  sales: number;
  revenue: number;
  views: number;
  conversionRate: number;
}

// ========== Form Types ==========
export interface CropPlannerFormData {
  landPhoto: File | null;
  soilType: string;
  landSize: number;
  landSizeUnit: 'acres' | 'hectares';
  location: Location;
  waterAvailability: 'abundant' | 'moderate' | 'limited';
  currentCrops?: string[];
  budget?: number;
}

export interface ValueBoosterFormData {
  cropPhoto: File | null;
  cropName: string;
  quantity: number;
  unit: string;
  quality: 'premium' | 'standard' | 'basic';
  targetMarket: 'local' | 'international' | 'both';
}

// ========== API Response Types ==========
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
