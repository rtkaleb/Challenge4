import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, index: true },
    city:        { type: String, required: true, index: true },
    address:     { type: String },
    cuisine:     { type: [String], index: true },
    price_level: { type: Number, min: 1, max: 4, index: true }, // puedes mantenerlo, pero también añadimos 'price' para el rango
    price:       { type: Number, min: 0, index: true },         // 👈 NUEVO (para filtros price_min / price_max)
    rating:      { type: Number, min: 0, max: 5, default: 0, index: true },
    tags:        { type: [String], index: true },
    openNow:     { type: Boolean, default: false, index: true }, // 👈 NUEVO (para filtro open_now)
    isActive:    { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

RestaurantSchema.index({ name: 'text', tags: 'text', cuisine: 'text' });

RestaurantSchema.index({ createdAt: -1 });

export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

