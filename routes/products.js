import express from 'express';
import { List,Create,ProductById,Read,Delete,Update,image } from '../controller/product';
const router = express.Router();

router.get('/products',List);

router.post('/products',Create);

router.get('/product/:productId',Read);

router.put('/product/:productId',Update)

router.delete('/product/:productId',Delete);

// router.get("/product/image/:productId", image);

router.param('productId',ProductById);

module.exports = router;