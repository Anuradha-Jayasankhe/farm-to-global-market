import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { aiLimiter } from '../middleware/rateLimiter';
import {
  cropPlanner,
  pestDetection,
  valueBooster,
  packagingGenerator,
  getConsultationHistory,
  getConsultation,
  deleteConsultation
} from '../controllers/ai.controller';

const router = Router();

// All AI routes require authentication and rate limiting
router.use(protect);
router.use(aiLimiter);

router.post('/crop-planner', cropPlanner);
router.post('/pest-detection', pestDetection);
router.post('/value-booster', valueBooster);
router.post('/packaging-generator', packagingGenerator);
router.get('/history', getConsultationHistory);
router.get('/:id', getConsultation);
router.delete('/:id', deleteConsultation);

export default router;
