import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './module/auth/auth.routes';
import userRoutes from './module/users/user.routes';

dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  
  console.log(`Server is running on http://localhost:${PORT}`);
});
