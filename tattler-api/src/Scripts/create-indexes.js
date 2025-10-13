// src/scripts/create-indexes.js
import 'dotenv/config';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant.model.js'; // Usa TU modelo; no declares schemas aquí

(async () => {
  try {
    // Acepta ambos formatos desde .env
    let uri = process.env.MONGODB_URI;
    if (!uri && process.env.MONGO_URI && process.env.MONGO_DBNAME) {
      uri = `${process.env.MONGO_URI}/${process.env.MONGO_DBNAME}`;
    }
    if (!uri) throw new Error('Falta MONGODB_URI o MONGO_URI/MONGO_DBNAME en .env');

    await mongoose.connect(uri);

    // Sincroniza ÚNICAMENTE los índices definidos en tu schema/modelo
    await Restaurant.syncIndexes();

    console.log('[Indexes] Índices creados/asegurados correctamente.');
  } catch (err) {
    console.error('[Indexes] Error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
