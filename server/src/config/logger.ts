import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  // Add stack trace for errors
  if (stack) {
    msg += `\n${stack}`;
  }
  
  // Add metadata if present
  if (Object.keys(metadata).length > 0) {
    msg += `\n${JSON.stringify(metadata, null, 2)}`;
  }
  
  return msg;
});

// Create logs directory path
const logsDir = process.env.LOG_FILE_PATH || path.join(__dirname, '../../logs');

// Console transport with colors (for development)
const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
});

// File transport for all logs
const fileTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
});

// File transport for error logs only
const errorFileTransport = new DailyRotateFile({
  level: 'error',
  filename: path.join(logsDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
});

// File transport for HTTP requests (future use)
// const httpTransport = new DailyRotateFile({
//   filename: path.join(logsDir, 'http-%DATE%.log'),
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '7d',
//   format: combine(
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     json()
//   ),
// });

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'farm2global-api' },
  transports: [
    fileTransport,
    errorFileTransport,
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport);
}

// HTTP Request Logger Middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Log request
  logger.info('Incoming Request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };

    if (res.statusCode >= 400) {
      logger.error('Request Error', logData);
    } else {
      logger.info('Request Completed', logData);
    }
  });

  next();
};

// Error Logger Middleware
export const errorLogger = (err: any, req: Request, _res: Response, next: NextFunction) => {
  logger.error('Application Error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    body: req.body,
  });
  
  next(err);
};

// Database operation logger
export const dbLogger = {
  success: (operation: string, details?: any) => {
    logger.info(`DB Operation Success: ${operation}`, details);
  },
  error: (operation: string, error: any, details?: any) => {
    logger.error(`DB Operation Failed: ${operation}`, {
      error: error.message,
      stack: error.stack,
      ...details,
    });
  },
};

// AI service logger
export const aiLogger = {
  request: (service: string, input: any) => {
    logger.info(`AI Service Request: ${service}`, { input });
  },
  response: (service: string, output: any, duration: number) => {
    logger.info(`AI Service Response: ${service}`, { 
      outputSize: JSON.stringify(output).length,
      duration: `${duration}ms`
    });
  },
  error: (service: string, error: any) => {
    logger.error(`AI Service Error: ${service}`, {
      error: error.message,
      stack: error.stack,
    });
  },
};

// Payment logger
export const paymentLogger = {
  transaction: (action: string, details: any) => {
    logger.info(`Payment Transaction: ${action}`, details);
  },
  error: (action: string, error: any) => {
    logger.error(`Payment Error: ${action}`, {
      error: error.message,
      stack: error.stack,
    });
  },
};

export default logger;
