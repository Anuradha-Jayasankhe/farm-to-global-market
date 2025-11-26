import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getProfile,
  updateProfile,
  updateAvatar,
  updatePreferences,
  updateSubscription,
  getUserActivity,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.delete('/me', deleteAccount);

// Avatar and preferences
router.put('/avatar', updateAvatar);
router.put('/preferences', updatePreferences);

// Subscription
router.put('/subscription', updateSubscription);

// Activity
router.get('/activity', getUserActivity);

// Admin routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
