import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { logger } from '../config/logger';

// Check if in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// General API rate limiter
export const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: isDevelopment ? 1000 : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Higher limit in dev
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment, // Skip rate limiting in development
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.',
    });
  },
});

// Strict rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 100 : 5, // Much higher in dev
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true,
  skip: () => isDevelopment, // Skip in development
});

// File upload rate limiter
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDevelopment ? 200 : 20, // Higher limit in dev
  message: {
    success: false,
    message: 'Too many upload attempts, please try again later.',
  },
  skip: () => isDevelopment, // Skip in development
});

// AI service rate limiter (more restrictive)
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDevelopment ? 300 : 30, // Higher in dev
  message: {
    success: false,
    message: 'AI service usage limit reached. Please upgrade your plan or try again later.',
  },
  skip: () => isDevelopment, // Skip in development
  handler: (req: Request, res: Response) => {
    logger.warn(`AI rate limit exceeded for IP: ${req.ip}, User: ${(req as any).user?.id}`);
    res.status(429).json({
      success: false,
      message: 'AI service usage limit reached. Please upgrade your plan.',
    });
  },
});
