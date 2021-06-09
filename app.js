import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import categoryRouter from './routes/category';
import blogRouter from './routes/blog';
import commentRouter from './routes/comment';
import contactRouter from './routes/contact';
import orderRouter from './routes/order';
import orderDetailRouter from './routes/orderDetail';
const authRouter = require('./routes/auth');
import userRouter from './routes/user';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

//connection
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser : true,
  useCreateIndex : true
}).then(()=>{
  console.log('db connectioned');
})
mongoose.connection.on('error',(err)=>{
  console.log('lôi');
})

// middleware 
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());

//routes middleware
app.use('/api',productsRouter);
app.use('/api',categoryRouter);
app.use('/api',blogRouter);
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',commentRouter);
app.use('/api',contactRouter);
app.use('/api',orderRouter);
app.use('/api',orderDetailRouter);
const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log('server is running');
})