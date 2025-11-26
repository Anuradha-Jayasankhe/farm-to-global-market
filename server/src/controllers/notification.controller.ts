import { Request, Response } from 'express';
import { Notification } from '../models/Notification.model';
import logger from '../utils/logger';

// @desc    Get all notifications for user
// @route   GET /api/v1/notifications
// @access  Private
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const notifications = await Notification.find({ recipient: req.user?.id })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments({ recipient: req.user?.id });
    const unreadCount = await Notification.countDocuments({
      recipient: req.user?.id,
      isRead: false
    });

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    logger.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get unread notifications
// @route   GET /api/v1/notifications/unread
// @access  Private
export const getUnreadNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user?.id,
      isRead: false
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error: any) {
    logger.error('Get unread notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check ownership
    if (notification.recipient.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error: any) {
    logger.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/read-all
// @access  Private
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    await Notification.updateMany(
      { recipient: req.user?.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error: any) {
    logger.error('Mark all as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete notification
// @route   DELETE /api/v1/notifications/:id
// @access  Private
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check ownership
    if (notification.recipient.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete all notifications
// @route   DELETE /api/v1/notifications/all
// @access  Private
export const deleteAllNotifications = async (req: Request, res: Response) => {
  try {
    await Notification.deleteMany({ recipient: req.user?.id });

    res.status(200).json({
      success: true,
      message: 'All notifications deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete all notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create notification (System/Admin use)
// @route   POST /api/v1/notifications
// @access  Private/Admin
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { recipient, type, message, link, data } = req.body;

    const notification = await Notification.create({
      recipient,
      type,
      message,
      link,
      data
    });

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error: any) {
    logger.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Helper function to create notifications (used by other controllers)
export const createNotificationHelper = async (
  recipient: string,
  type: string,
  message: string,
  link?: string,
  data?: any
) => {
  try {
    await Notification.create({
      recipient,
      type,
      message,
      link,
      data
    });
  } catch (error) {
    logger.error('Create notification helper error:', error);
  }
};
