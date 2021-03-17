import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRouter from './routes/products';

const app = express();
dotenv.config();

app.use(morgan('dev'));
//routes
app.use('/api',productsRouter);

const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log('server is running');
})