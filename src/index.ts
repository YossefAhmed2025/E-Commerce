import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';

const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');

    app.use('/users', userRouter);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
  });