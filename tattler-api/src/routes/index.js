import { Router } from 'express';
import restaurantRoutes from './restaurant.routes.js';
import recommendationRoutes from './recommendation.routes.js';

const router = Router();
router.use('/restaurants', restaurantRoutes);
router.use('/recommendations', recommendationRoutes);
export default router;
