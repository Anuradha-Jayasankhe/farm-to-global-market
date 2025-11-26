import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../models/User.model';
import { Product } from '../models/Product.model';
import { logger } from '../config/logger';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Default test accounts
const defaultUsers = [
  {
    email: 'admin@farm2global.com',
    password: 'Admin@123',
    firstName: 'System',
    lastName: 'Administrator',
    phone: '+1234567890',
    role: 'admin',
    isEmailVerified: true,
    isActive: true,
    subscription: {
      plan: 'premium',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isActive: true,
    },
  },
  {
    email: 'farmer@test.com',
    password: 'Farmer@123',
    firstName: 'John',
    lastName: 'Farmer',
    phone: '+1234567891',
    role: 'farmer',
    isEmailVerified: true,
    isActive: true,
    location: {
      address: '123 Farm Road',
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
    },
    farmDetails: {
      farmName: 'Green Valley Farm',
      farmSize: 50,
      farmType: 'Organic',
      crops: ['tomatoes', 'lettuce', 'carrots', 'potatoes'],
    },
    subscription: {
      plan: 'pro',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  },
  {
    email: 'buyer@test.com',
    password: 'Buyer@123',
    firstName: 'Sarah',
    lastName: 'Buyer',
    phone: '+1234567892',
    role: 'buyer',
    isEmailVerified: true,
    isActive: true,
    location: {
      address: '456 Market Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
    subscription: {
      plan: 'basic',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  },
  {
    email: 'processor@test.com',
    password: 'Processor@123',
    firstName: 'Mike',
    lastName: 'Processor',
    phone: '+1234567893',
    role: 'processor',
    isEmailVerified: true,
    isActive: true,
    location: {
      address: '789 Industrial Blvd',
      city: 'Detroit',
      state: 'MI',
      country: 'USA',
    },
    subscription: {
      plan: 'pro',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  },
  {
    email: 'farmer2@test.com',
    password: 'Farmer@123',
    firstName: 'Maria',
    lastName: 'Garcia',
    phone: '+1234567894',
    role: 'farmer',
    isEmailVerified: true,
    isActive: true,
    location: {
      address: '321 Countryside Lane',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
    },
    farmDetails: {
      farmName: 'Sunshine Organic Farm',
      farmSize: 75,
      farmType: 'Organic',
      crops: ['strawberries', 'blueberries', 'corn', 'wheat'],
    },
    subscription: {
      plan: 'basic',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  },
  {
    email: 'seller@test.com',
    password: 'Seller@123',
    firstName: 'David',
    lastName: 'Seller',
    phone: '+1234567895',
    role: 'accessories_seller',
    isEmailVerified: true,
    isActive: true,
    location: {
      address: '555 Commerce Drive',
      city: 'Dallas',
      state: 'TX',
      country: 'USA',
    },
    subscription: {
      plan: 'pro',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  },
];

// Sample products
const sampleProducts = [
  {
    name: 'Fresh Organic Tomatoes',
    description: 'Vine-ripened organic tomatoes, perfect for salads and cooking. Grown without pesticides or harmful chemicals.',
    category: 'crops',
    subcategory: 'vegetables',
    price: 3.99,
    currency: 'USD',
    unit: 'kg',
    minOrder: 10,
    maxOrder: 500,
    stock: 500,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1546470427-e26264f6c5e9?w=500'],
    thumbnail: 'https://images.unsplash.com/photo-1546470427-e26264f6c5e9?w=500',
    location: {
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
    },
    isOrganic: true,
    isCertified: true,
    certifications: ['USDA Organic', 'Non-GMO'],
    marketType: 'local',
    shipping: {
      available: true,
      cost: 15,
      estimatedDays: 3,
      method: 'Ground',
    },
    tags: ['organic', 'tomatoes', 'vegetables', 'fresh'],
    isActive: true,
    isApproved: true,
    isFeatured: true,
  },
  {
    name: 'Fresh Lettuce Heads',
    description: 'Crisp, fresh lettuce heads grown organically. Perfect for salads and sandwiches.',
    category: 'crops',
    subcategory: 'vegetables',
    price: 2.49,
    currency: 'USD',
    unit: 'piece',
    minOrder: 20,
    maxOrder: 300,
    stock: 300,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500'],
    thumbnail: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500',
    location: {
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
    },
    isOrganic: true,
    isCertified: true,
    certifications: ['USDA Organic'],
    marketType: 'local',
    shipping: {
      available: true,
      cost: 12,
      estimatedDays: 2,
      method: 'Ground',
    },
    tags: ['organic', 'lettuce', 'vegetables', 'fresh', 'salad'],
    isActive: true,
    isApproved: true,
    isFeatured: false,
  },
  {
    name: 'Organic Carrots',
    description: 'Sweet and crunchy organic carrots. Rich in vitamins and minerals.',
    category: 'crops',
    subcategory: 'vegetables',
    price: 2.99,
    currency: 'USD',
    unit: 'kg',
    minOrder: 15,
    maxOrder: 400,
    stock: 400,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500'],
    thumbnail: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500',
    location: {
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
    },
    isOrganic: true,
    isCertified: true,
    certifications: ['USDA Organic', 'Non-GMO'],
    marketType: 'global',
    shipping: {
      available: true,
      cost: 20,
      estimatedDays: 5,
      method: 'Air Freight',
    },
    tags: ['organic', 'carrots', 'vegetables', 'fresh', 'healthy'],
    isActive: true,
    isApproved: true,
    isFeatured: true,
  },
  {
    name: 'Fresh Strawberries',
    description: 'Sweet, juicy strawberries picked at peak ripeness. Grown with care and no harmful chemicals.',
    category: 'crops',
    subcategory: 'fruits',
    price: 5.99,
    currency: 'USD',
    unit: 'kg',
    minOrder: 5,
    maxOrder: 200,
    stock: 200,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500'],
    thumbnail: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
    },
    isOrganic: true,
    isCertified: true,
    certifications: ['USDA Organic'],
    marketType: 'local',
    shipping: {
      available: true,
      cost: 18,
      estimatedDays: 2,
      method: 'Express',
    },
    tags: ['organic', 'strawberries', 'fruits', 'fresh', 'berries'],
    isActive: true,
    isApproved: true,
    isFeatured: true,
  },
  {
    name: 'Organic Blueberries',
    description: 'Plump, sweet blueberries bursting with flavor. Rich in antioxidants.',
    category: 'crops',
    subcategory: 'fruits',
    price: 7.99,
    currency: 'USD',
    unit: 'kg',
    minOrder: 5,
    maxOrder: 150,
    stock: 150,
    isInStock: true,
    images: ['https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500'],
    thumbnail: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
    },
    isOrganic: true,
    isCertified: true,
    certifications: ['USDA Organic', 'Non-GMO'],
    marketType: 'global',
    shipping: {
      available: true,
      cost: 25,
      estimatedDays: 3,
      method: 'Air Freight',
    },
    tags: ['organic', 'blueberries', 'fruits', 'fresh', 'berries', 'antioxidants'],
    isActive: true,
    isApproved: true,
    isFeatured: false,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-to-global-market';
    await mongoose.connect(mongoURI);
    logger.info('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    logger.info('🗑️  Clearing existing users and products...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create users
    logger.info('👥 Creating default users...');
    const createdUsers = await User.create(defaultUsers);
    logger.info(`✅ Created ${createdUsers.length} users`);

    // Create products (assign to farmers)
    const farmers = createdUsers.filter(user => user.role === 'farmer');
    
    if (farmers.length > 0) {
      logger.info('📦 Creating sample products...');
      
      const productsWithFarmers = sampleProducts.map((product, index) => {
        const farmer = farmers[index % farmers.length];
        return {
          ...product,
          seller: farmer._id,
          sellerName: `${farmer.firstName} ${farmer.lastName}`,
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        };
      });

      const createdProducts = await Product.create(productsWithFarmers);
      logger.info(`✅ Created ${createdProducts.length} products`);
    }

    // Display login credentials
    logger.info('\n========================================');
    logger.info('🎉 Database seeded successfully!');
    logger.info('========================================\n');
    logger.info('📝 LOGIN CREDENTIALS:\n');
    
    defaultUsers.forEach((user, index) => {
      logger.info(`${index + 1}. ${user.role.toUpperCase()}`);
      logger.info(`   Email:    ${user.email}`);
      logger.info(`   Password: ${user.password}`);
      logger.info(`   Name:     ${user.firstName} ${user.lastName}\n`);
    });

    logger.info('========================================');
    logger.info('🚀 You can now login with these credentials');
    logger.info('========================================\n');

    process.exit(0);
  } catch (error: any) {
    logger.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
