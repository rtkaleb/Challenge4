import { Router } from 'express';
import {
  listRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  softDeleteRestaurant
} from '../controllers/restaurant.controller.js';

const router = Router();

router.get('/', listRestaurants);
router.get('/:id', getRestaurant);
router.post('/', createRestaurant);
router.patch('/:id', updateRestaurant);
router.delete('/:id', softDeleteRestaurant);

export default router;
