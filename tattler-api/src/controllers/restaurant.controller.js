import Restaurant from '../models/restaurant.model.js';
import ApiFeatures from '../utils/ApiFeatures.js';

const ALLOWED_SORT = new Set(['rating', 'price', 'name', 'createdAt']);

export const listRestaurants = async (req, res, next) => {
  try {
    const {
      q,               // texto libre
      cuisine,         // 'Mexican,Thai'
      city,            // exacto
      price_min,       // número
      price_max,       // número
      rating_gte,      // número
      open_now,        // 'true' | 'false'
      sort,            // rating | price | name | createdAt
      order,           // asc | desc
      page = '1',      // por defecto 1
      limit = '10'     // por defecto 10
    } = req.query;

    // Paginación segura
    const pageNum  = Math.max(parseInt(page)  || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
    const skipNum  = (pageNum - 1) * limitNum;

    // Filtro base: solo activos (si usas soft delete con isActive)
    const filter = { isActive: { $ne: false } };

    // Búsqueda de texto (requiere índice de texto en el modelo)
    if (q && q.trim()) {
      filter.$text = { $search: q.trim() };
    }

    // Filtros exactos
    if (city) filter.city = city;

    if (cuisine) {
      const list = cuisine.split(',').map(s => s.trim()).filter(Boolean);
      if (list.length === 1) filter.cuisine = list[0];
      else if (list.length > 1) filter.cuisine = { $in: list };
    }

    // Rangos
    const priceRange = {};
    if (price_min !== undefined) priceRange.$gte = Number(price_min);
    if (price_max !== undefined) priceRange.$lte = Number(price_max);
    if (Object.keys(priceRange).length) filter.price = priceRange;

    if (rating_gte !== undefined) filter.rating = { $gte: Number(rating_gte) };

    // Booleano simple
    if (open_now === 'true') filter.openNow = true;

    // Orden seguro
    let sortStage = { createdAt: -1 };
    if (sort && ALLOWED_SORT.has(sort)) {
      sortStage = { [sort]: (order === 'desc' ? -1 : 1) };
    }

    // Total + página
    const [total, items] = await Promise.all([
      Restaurant.countDocuments(filter),
      Restaurant.find(filter)
        .sort(sortStage)
        .skip(skipNum)
        .limit(limitNum)
        .lean()
    ]);

    return res.json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      items
    });
  } catch (err) {
    console.error('GET /restaurants error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

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
