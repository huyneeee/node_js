import express from 'express'
import { Create, Delete, List, orderId, Read } from '../controller/order';
const router = express.Router();
router.post('/order',Create);
router.get('/order/:orderId',Read);
router.delete('/order/:orderId',Delete);
router.param('orderId',orderId);
router.get('/order',List);

module.exports = router;