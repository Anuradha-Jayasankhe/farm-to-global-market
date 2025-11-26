import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getDashboardAnalytics,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics,
  getRevenueAnalytics
} from '../controllers/analytics.controller';

const router = Router();

// All routes require authentication
router.use(protect);

router.get('/dashboard', getDashboardAnalytics);
router.get('/sales', getSalesAnalytics);
router.get('/products', getProductAnalytics);

// Admin only
router.get('/users', authorize('admin'), getUserAnalytics);
router.get('/revenue', authorize('admin'), getRevenueAnalytics);

export default router;
