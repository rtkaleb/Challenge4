import Restaurant from '../models/restaurant.model.js';
import User from '../models/user.model.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const q = { isActive: true };
    if (user.preferences.cuisines?.length) q.cuisine = { $in: user.preferences.cuisines };
    if (user.preferences.cities?.length) q.city = { $in: user.preferences.cities };
    if (user.preferences.priceRange?.max) q.price_level = { $lte: user.preferences.priceRange.max };

    const items = await Restaurant.find(q).sort('-rating').limit(10);
    res.json({ user: user.email, recommendations: items });
  } catch (err) { next(err); }
};
