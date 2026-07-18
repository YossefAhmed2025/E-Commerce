import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import { seedinitialProducts } from './services/productServices.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');

    //seed initial products
    seedinitialProducts();
    

    app.use('/users', userRouter);
    app.use('/products',productRouter);
    app.use('/cart',cartRouter);
  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
  });