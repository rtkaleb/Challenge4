import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    city: { type: String, required: true, index: true },
    address: { type: String },
    cuisine: { type: [String], index: true },
    price_level: { type: Number, min: 1, max: 4, index: true },
    rating: { type: Number, min: 0, max: 5, default: 0, index: true },
    tags: { type: [String], index: true },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

RestaurantSchema.index({ name: 'text', tags: 'text' });

export default mongoose.model('Restaurant', RestaurantSchema);
