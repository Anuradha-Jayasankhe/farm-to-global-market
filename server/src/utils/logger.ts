/* eslint-disable no-console */

/**
 * Simple logger utility for the application
 * Uses console methods with prefixed timestamps
 */

const getTimestamp = (): string => {
  return new Date().toISOString();
};

const logger = {
  info: (...args: any[]): void => {
    console.log(`[${getTimestamp()}] [INFO]`, ...args);
  },

  error: (...args: any[]): void => {
    console.error(`[${getTimestamp()}] [ERROR]`, ...args);
  },

  warn: (...args: any[]): void => {
    console.warn(`[${getTimestamp()}] [WARN]`, ...args);
  },

  debug: (...args: any[]): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${getTimestamp()}] [DEBUG]`, ...args);
    }
  },
};

export default logger;
