import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Restaurant from '../models/restaurant.model.js';
import User from '../models/user.model.js';

async function run() {
  await connectDB();
  await Restaurant.deleteMany({});
  await User.deleteMany({});

  await Restaurant.insertMany([
    { name: 'Taquería La Silla', city: 'Monterrey', cuisine: ['mexican'], price_level: 1, rating: 4.5, tags: ['tacos','casual'] },
    { name: 'Parrilla Norteña', city: 'Monterrey', cuisine: ['bbq','steak'], price_level: 3, rating: 4.7, tags: ['grill'] },
    { name: 'Ramen Mty', city: 'Monterrey', cuisine: ['japanese'], price_level: 2, rating: 4.2, tags: ['noodles'] }
  ]);

  const user = await User.create({
    email: 'demo@tattler.com',
    name: 'Demo',
    preferences: { cuisines: ['mexican','bbq'], priceRange: { max: 3 }, cities: ['Monterrey'] }
  });

  console.log('Seed done. userId=', user._id.toString());
  process.exit(0);
}
run().catch((e) => { console.error(e); process.exit(1); });
