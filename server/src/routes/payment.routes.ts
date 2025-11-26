import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  createPaymentIntent,
  confirmPayment,
  getPayment,
  getTransactions,
  processRefund,
  handleWebhook,
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod
} from '../controllers/payment.controller';

const router = Router();

// Webhook (no auth required - verified by signature)
router.post('/webhook', handleWebhook);

// All other routes require authentication
router.use(protect);

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/transactions', getTransactions);
router.get('/methods', getPaymentMethods);
router.post('/methods', addPaymentMethod);
router.delete('/methods/:id', deletePaymentMethod);
router.get('/:id', getPayment);
router.post('/refund', authorize('admin', 'farmer'), processRefund);

export default router;
