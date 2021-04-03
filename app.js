import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import categoryRouter from './routes/category';
import blogRouter from './routes/blog';
import authRouter from './routes/auth';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(cors())
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

app.use(morgan('dev'));
//routes
app.use('/api',productsRouter);
app.use('/api',categoryRouter);
app.use('/api',blogRouter);
app.use('/api',authRouter);



const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log('server is running');
})