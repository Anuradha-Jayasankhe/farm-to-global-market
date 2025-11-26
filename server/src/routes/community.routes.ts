import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getMyPosts,
  pinPost
} from '../controllers/community.controller';

const router = Router();

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPost);

// Protected routes
router.use(protect);
router.get('/posts/user/me', getMyPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/posts/:id/like', likePost);
router.post('/posts/:id/comment', addComment);
router.delete('/posts/:postId/comment/:commentId', deleteComment);
router.put('/posts/:id/pin', authorize('admin'), pinPost);

export default router;
