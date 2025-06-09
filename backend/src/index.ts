import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './module/auth/auth.routes';
import userRoutes from './module/users/user.routes';
import productRoutes from './module/products/product.routes'
import catgoriesRoutes from './module/catagory/category.routes'
import cartRoutes from './module/cart/cart.routes';

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
app.use('/api/product', productRoutes);
app.use('/api/catagory', catgoriesRoutes)
// app.use('/api/cart', cartRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  
  console.log(`Server is running on http://localhost:${PORT}`);
});
