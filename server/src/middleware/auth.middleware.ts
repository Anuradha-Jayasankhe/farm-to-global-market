import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { logger } from '../config/logger';
import { AppError, asyncHandler } from './errorHandler';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Protect routes - verify JWT token
export const protect = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    logger.warn('No token provided for protected route');
    throw new AppError('Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('User account is deactivated', 403);
    }

    // Attach user to request
    req.user = user;
    
    logger.info(`User authenticated: ${user.email}`);
    next();
  } catch (error: any) {
    logger.error('Token verification failed:', error.message);
    throw new AppError('Not authorized to access this route', 401);
  }
});

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Access denied for role: ${req.user.role} to route: ${req.originalUrl}`);
      throw new AppError(
        `User role '${req.user.role}' is not authorized to access this route`,
        403
      );
    }

    logger.info(`Role authorized: ${req.user.role} for ${req.originalUrl}`);
    next();
  };
};

// Check if user owns the resource
export const checkOwnership = (resourceModel: string) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const resourceId = req.params.id;
    const userId = req.user.id;

    // Import model dynamically
    const Model = require(`../models/${resourceModel}.model`).default;
    const resource = await Model.findById(resourceId);

    if (!resource) {
      throw new AppError('Resource not found', 404);
    }

    // Check if user owns the resource or is admin
    if (resource.user.toString() !== userId && req.user.role !== 'admin') {
      logger.warn(`Ownership check failed for user: ${userId} on resource: ${resourceId}`);
      throw new AppError('Not authorized to access this resource', 403);
    }

    next();
  });
};

// Verify email token
export const verifyEmailToken = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  if (!token) {
    throw new AppError('Invalid verification token', 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    throw new AppError('Invalid or expired verification token', 400);
  }
});
