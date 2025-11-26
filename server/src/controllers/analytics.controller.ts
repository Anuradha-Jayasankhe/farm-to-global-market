import { Request, Response } from 'express';
import { Order } from '../models/Order.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import logger from '../utils/logger';

// @desc    Get dashboard analytics
// @route   GET /api/v1/analytics/dashboard
// @access  Private
export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    let analytics: any = {};

    if (userRole === 'admin') {
      // Admin analytics
      const totalUsers = await User.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      
      const revenueData = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$pricing.totalAmount' } } }
      ]);

      const recentOrders = await Order.find()
        .limit(5)
        .sort({ createdAt: -1 })
        .populate('user', 'firstName lastName');

      analytics = {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenueData[0]?.total || 0,
        recentOrders
      };
    } else if (userRole === 'farmer') {
      // Farmer analytics
      const myProducts = await Product.countDocuments({ seller: userId });
      
      const myOrders = await Order.find({ 'items.seller': userId });
      const totalSales = myOrders.reduce((sum, order) => {
        const sellerItems = order.items.filter((item: any) => item.seller?.toString() === userId);
        const sellerTotal = sellerItems.reduce((itemSum: number, item: any) => itemSum + (item.price * item.quantity), 0);
        return sum + sellerTotal;
      }, 0);

      const productViews = await Product.aggregate([
        { $match: { seller: userId as any } },
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]);

      analytics = {
        totalProducts: myProducts,
        totalOrders: myOrders.length,
        totalRevenue: totalSales,
        totalViews: productViews[0]?.total || 0,
        recentOrders: myOrders.slice(0, 5)
      };
    } else {
      // Buyer analytics
      const myOrders = await Order.find({ buyer: userId });
      const totalSpent = myOrders.reduce((sum: number, order: any) => sum + order.total, 0);

      analytics = {
        totalOrders: myOrders.length,
        totalSpent,
        pendingOrders: myOrders.filter((o: any) => o.status === 'pending').length,
        completedOrders: myOrders.filter((o: any) => o.status === 'delivered').length,
        recentOrders: myOrders.slice(0, 5)
      };
    }

    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error: any) {
    logger.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get sales analytics
// @route   GET /api/v1/analytics/sales
// @access  Private (Farmer/Admin)
export const getSalesAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = 'month' } = req.query;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const matchQuery: any = {
      createdAt: { $gte: startDate },
      isPaid: true
    };

    // Filter by seller if not admin
    if (userRole !== 'admin') {
      matchQuery['items.seller'] = userId;
    }

    const salesData = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          totalSales: { $sum: '$pricing.totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Calculate totals
    const totals = salesData.reduce((acc, item) => ({
      totalRevenue: acc.totalRevenue + item.totalSales,
      totalOrders: acc.totalOrders + item.orderCount
    }), { totalRevenue: 0, totalOrders: 0 });

    res.status(200).json({
      success: true,
      data: {
        period,
        salesData,
        totals
      }
    });
  } catch (error: any) {
    logger.error('Get sales analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get product analytics
// @route   GET /api/v1/analytics/products
// @access  Private (Farmer/Admin)
export const getProductAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const matchQuery: any = {};
    if (userRole !== 'admin') {
      matchQuery.seller = userId;
    }

    // Top performing products
    const topProducts = await Product.find(matchQuery)
      .sort({ views: -1 })
      .limit(10)
      .select('name views rating numReviews');

    // Products by category
    const categoryStats = await Product.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          totalViews: { $sum: '$views' }
        }
      }
    ]);

    // Low stock products
    const lowStockProducts = await Product.find({
      ...matchQuery,
      'stock.quantity': { $lt: 10 }
    }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        topProducts,
        categoryStats,
        lowStockProducts
      }
    });
  } catch (error: any) {
    logger.error('Get product analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user analytics (Admin only)
// @route   GET /api/v1/analytics/users
// @access  Private/Admin
export const getUserAnalytics = async (req: Request, res: Response) => {
  try {
    // Users by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // New users trend
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Active users (with orders in last 30 days)
    const activeUsers = await Order.distinct('user', {
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        usersByRole,
        newUsersLast30Days: newUsers,
        activeUsersCount: activeUsers.length
      }
    });
  } catch (error: any) {
    logger.error('Get user analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get revenue analytics (Admin)
// @route   GET /api/v1/analytics/revenue
// @access  Private/Admin
export const getRevenueAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = 'year' } = req.query;

    const now = new Date();
    let startDate = new Date();
    
    if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          isPaid: true
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$pricing.totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Calculate growth rate
    if (revenueData.length >= 2) {
      const current = revenueData[revenueData.length - 1].revenue;
      const previous = revenueData[revenueData.length - 2].revenue;
      const growthRate = ((current - previous) / previous) * 100;

      res.status(200).json({
        success: true,
        data: {
          revenueData,
          growthRate: growthRate.toFixed(2)
        }
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          revenueData,
          growthRate: 0
        }
      });
    }
  } catch (error: any) {
    logger.error('Get revenue analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
