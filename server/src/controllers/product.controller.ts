import { Request, Response } from 'express';
import { Product } from '../models/Product.model';
import logger from '../utils/logger';

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      marketplace
    } = req.query;

    const query: any = { isActive: true };

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Marketplace filter
    if (marketplace) {
      query.marketplace = marketplace;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .populate('seller', 'firstName lastName avatar')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort as string);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error: any) {
    logger.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'firstName lastName avatar location phone email')
      .populate('reviews.user', 'firstName lastName avatar');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views = (product.views || 0) + 1;
    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: any) {
    logger.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Farmer only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user?.id
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error: any) {
    logger.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Owner only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.seller.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error: any) {
    logger.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Owner only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.seller.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's products
// @route   GET /api/v1/products/user/me
// @access  Private
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ seller: req.user?.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error: any) {
    logger.error('Get my products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add product review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update rating (simplified - should use separate Review model in production)
    const currentTotal = product.rating * product.reviews;
    const newTotal = currentTotal + Number(rating);
    product.reviews = product.reviews + 1;
    product.rating = newTotal / product.reviews;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: product
    });
  } catch (error: any) {
    logger.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update stock
// @route   PUT /api/v1/products/:id/stock
// @access  Private (Owner only)
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.seller.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    product.stock = Number(quantity);
    product.isInStock = Number(quantity) > 0;

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error: any) {
    logger.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
