import express from 'express'
import { requireSignin } from '../controller/auth';
import { Create, Delete, List, orderId, Read } from '../controller/order';
import { userById } from '../controller/user'
const router = express.Router();
router.post('/order/:userId',requireSignin,Create);

router.get('/order/:orderId',Read);

// router.delete('/order/:orderId',Delete);

router.param('orderId',orderId);

router.get('/order',List);

router.param('userId',userById)

module.exports = router;