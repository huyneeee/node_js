import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controller/auth';
import { List,Create,ProductById,Read,Delete,Update,ProductByCateId, ProductByTextSearch,ProductByPrice,ProductPagination, countProduct } from '../controller/product';
import { userById } from '../controller/user'
const router = express.Router();

router.get('/products',List);

// router.get('/products',List);

router.post('/product/:user',requireSignin,isAuth,isAdmin,Create);

router.get('/product/:productId',Read);

router.put('/product/:productId/:user',requireSignin,isAuth,isAdmin,Update);

router.delete('/product/:productId/:user',requireSignin,isAuth,isAdmin,Delete);

router.get('/products/category/:cate_id',Read);

router.get('/products/:textSearch',Read);

router.param('textSearch',ProductByTextSearch);

router.post('/products/price',ProductByPrice);

router.post('/products',ProductPagination);

router.get('/countproduct',countProduct);

router.param('productId',ProductById);

router.param('cate_id',ProductByCateId);

router.param('user',userById);

module.exports = router;