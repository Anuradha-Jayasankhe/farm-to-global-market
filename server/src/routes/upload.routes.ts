import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { uploadLimiter } from '../middleware/rateLimiter';
import {
  uploadImage,
  uploadImages,
  uploadDocument,
  deleteFile,
  getFileInfo,
  generatePresignedUrl,
  getMyFiles
} from '../controllers/upload.controller';

const router = Router();

// All routes require authentication
router.use(protect);

router.post('/image', uploadLimiter, uploadImage);
router.post('/images', uploadLimiter, uploadImages);
router.post('/document', uploadLimiter, uploadDocument);
router.post('/presigned-url', generatePresignedUrl);
router.get('/my-files', getMyFiles);
router.get('/:fileId', getFileInfo);
router.delete('/:fileId', deleteFile);

export default router;
