import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import app from './app.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Tattler API running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
