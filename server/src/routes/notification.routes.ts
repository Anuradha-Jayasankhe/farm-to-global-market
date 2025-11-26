import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  createNotification
} from '../controllers/notification.controller';

const router = Router();

// All routes require authentication
router.use(protect);

router.get('/', getAllNotifications);
router.get('/unread', getUnreadNotifications);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);
router.delete('/all', deleteAllNotifications);
router.post('/', authorize('admin'), createNotification);

export default router;
