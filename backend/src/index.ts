import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './module/auth/auth.routes';

dotenv.config();


const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
