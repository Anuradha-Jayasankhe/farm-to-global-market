import mongoose from 'mongoose';
import { logger } from './logger';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-to-global-market';

    logger.info('Attempting to connect to MongoDB...');

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    logger.info(`📊 Database Name: ${conn.connection.name}`);

    // Connection event listeners
    mongoose.connection.on('error', (err: any) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully');
    });

  } catch (error: any) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    logger.warn('⚠️  Server will continue without database (MongoDB not available)');
    logger.warn('⚠️  Install MongoDB or use MongoDB Atlas for full functionality');
    
    // Don't retry in development if MongoDB is not available
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        logger.info('Retrying MongoDB connection...');
        connectDB();
      }, 5000);
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error: any) {
    logger.error(`Error closing MongoDB connection: ${error.message}`);
  }
};
