import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    preferences: {
      cuisines: { type: [String], default: [] },
      priceRange: { min: { type: Number }, max: { type: Number } },
      cities: { type: [String], default: [] }
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
