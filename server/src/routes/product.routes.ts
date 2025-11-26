import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  addReview,
  updateStock
} from '../controllers/product.controller';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected routes
router.use(protect);
router.get('/user/me', getMyProducts);
router.post('/', authorize('farmer', 'accessories_seller', 'admin'), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/reviews', addReview);
router.put('/:id/stock', updateStock);

export default router;
