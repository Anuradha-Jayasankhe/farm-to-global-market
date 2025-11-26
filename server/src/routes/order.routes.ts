import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getAllOrders,
  getSellerOrders
} from '../controllers/order.controller';

const router = Router();

// All routes require authentication
router.use(protect);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/seller/me', authorize('farmer', 'admin'), getSellerOrders);
router.get('/admin/all', authorize('admin'), getAllOrders);
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

export default router;
