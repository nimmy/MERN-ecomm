import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';

import productsRoutes from './routes/ProductsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';

import {notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
connectDB(); // Connected with mongoDB

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser Middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('APi Running');
});

app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=> console.log('Server Running on 5000!'));