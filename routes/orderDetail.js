import express from 'express'
import { Create , List} from '../controller/orderDetail';
const router = express.Router();
router.post('/orderdetail',Create);
router.get('/orderdetail',List);


module.exports = router;