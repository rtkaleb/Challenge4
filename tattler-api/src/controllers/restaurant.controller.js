import Restaurant from '../models/restaurant.model.js';
import ApiFeatures from '../utils/ApiFeatures.js';

export const listRestaurants = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Restaurant.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const data = await features.query;
    res.json({ count: data.length, data });
  } catch (err) { next(err); }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const item = await Restaurant.findById(req.params.id);
    if (!item || !item.isActive) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
};

export const createRestaurant = async (req, res, next) => {
  try {
    const item = await Restaurant.create(req.body);
    res.status(201).json(item);
  } catch (err) { next(err); }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const item = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
};

export const softDeleteRestaurant = async (req, res, next) => {
  try {
    const item = await Restaurant.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', item });
  } catch (err) { next(err); }
};
