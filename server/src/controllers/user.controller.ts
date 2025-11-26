import { Request, Response } from 'express';
import { User } from '../models/User.model';
import logger from '../utils/logger';

// @desc    Get current user profile
// @route   GET /api/v1/users/me
// @access  Private
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/me
// @access  Private
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      location,
      farmDetails,
      businessDetails,
      preferences
    } = req.body;

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (location) user.location = { ...user.location, ...location };
    if (farmDetails) user.farmDetails = { ...user.farmDetails, ...farmDetails };
    // businessDetails and preferences removed - not in User model

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error: any) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user avatar
// @route   PUT /api/v1/users/avatar
// @access  Private
export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      data: user
    });
  } catch (error: any) {
    logger.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user preferences
// @route   PUT /api/v1/users/preferences
// @access  Private
export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { preferences },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      data: user
    });
  } catch (error: any) {
    logger.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update subscription
// @route   PUT /api/v1/users/subscription
// @access  Private
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { plan, duration } = req.body;

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate expiry date
    const now = new Date();
    const expiryDate = new Date(now);
    
    if (duration === 'monthly') {
      expiryDate.setMonth(now.getMonth() + 1);
    } else if (duration === 'yearly') {
      expiryDate.setFullYear(now.getFullYear() + 1);
    }

    user.subscription = {
      plan,
      isActive: true,
      startDate: now,
      endDate: expiryDate
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      data: user.subscription
    });
  } catch (error: any) {
    logger.error('Update subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user activity
// @route   GET /api/v1/users/activity
// @access  Private
export const getUserActivity = async (req: Request, res: Response) => {
  try {
    // Activity tracking not implemented in User model yet
    // Return placeholder data
    res.status(200).json({
      success: true,
      data: [],
      message: 'Activity tracking coming soon'
    });
  } catch (error: any) {
    logger.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/v1/users/me
// @access  Private
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.user?.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    const query: any = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    logger.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    logger.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error: any) {
    logger.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
