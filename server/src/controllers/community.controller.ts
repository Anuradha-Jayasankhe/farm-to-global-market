import { Request, Response } from 'express';
import { CommunityPost } from '../models/CommunityPost.model';
import logger from '../utils/logger';

// @desc    Get all community posts
// @route   GET /api/v1/community/posts
// @access  Public
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sort = '-createdAt'
    } = req.query;

    const query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const posts = await CommunityPost.find(query)
      .populate('author', 'firstName lastName avatar role')
      .populate('comments.author', 'firstName lastName avatar')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort as string);

    const total = await CommunityPost.countDocuments(query);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    logger.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single post
// @route   GET /api/v1/community/posts/:id
// @access  Public
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'firstName lastName avatar role location')
      .populate('comments.author', 'firstName lastName avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error: any) {
    logger.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new post
// @route   POST /api/v1/community/posts
// @access  Private
export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = {
      ...req.body,
      author: req.user?.id
    };

    const post = await CommunityPost.create(postData);

    const populatedPost = await CommunityPost.findById(post._id)
      .populate('author', 'firstName lastName avatar role');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populatedPost
    });
  } catch (error: any) {
    logger.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update post
// @route   PUT /api/v1/community/posts/:id
// @access  Private
export const updatePost = async (req: Request, res: Response) => {
  try {
    let post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName avatar role');

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error: any) {
    logger.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/v1/community/posts/:id
// @access  Private
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/v1/community/posts/:id/like
// @access  Private
export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const userId = req.user?.id;
    const likes = post.likes || [];
    const hasLiked = likes.some((id: any) => id.toString() === userId);

    if (hasLiked) {
      // Unlike
      post.likes = likes.filter((id: any) => id.toString() !== userId);
    } else {
      // Like
      post.likes = [...likes, userId as any];
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: hasLiked ? 'Post unliked' : 'Post liked',
      data: {
        likes: post.likes.length,
        hasLiked: !hasLiked
      }
    });
  } catch (error: any) {
    logger.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/v1/community/posts/:id/comment
// @access  Private
export const addComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = {
      author: req.user?.id,
      content,
      createdAt: new Date()
    };

    post.comments = post.comments || [];
    post.comments.push(comment as any);
    await post.save();

    const updatedPost = await CommunityPost.findById(req.params.id)
      .populate('comments.author', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: updatedPost?.comments
    });
  } catch (error: any) {
    logger.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/v1/community/posts/:postId/comment/:commentId
// @access  Private
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;

    const post = await CommunityPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = post.comments?.find((c: any) => c._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check ownership
    if ((comment as any).author.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    post.comments = post.comments?.filter((c: any) => c._id.toString() !== commentId);
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's posts
// @route   GET /api/v1/community/posts/user/me
// @access  Private
export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const posts = await CommunityPost.find({ author: req.user?.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error: any) {
    logger.error('Get my posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Pin/Unpin post (Admin)
// @route   PUT /api/v1/community/posts/:id/pin
// @access  Private/Admin
export const pinPost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.isPinned = !post.isPinned;
    await post.save();

    res.status(200).json({
      success: true,
      message: post.isPinned ? 'Post pinned' : 'Post unpinned',
      data: post
    });
  } catch (error: any) {
    logger.error('Pin post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
