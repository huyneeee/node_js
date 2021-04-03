import express from 'express'

import { List , Create , CategoryId, Read,Delete ,Update} from '../controller/category'

const router = express.Router();

router.get('/category',List);

router.post('/category',Create);

router.get('/category/:categoryId',Read);

router.put('/category/:categoryId',Update);

router.delete('/category/:categoryId',Delete);

router.param('categoryId',CategoryId);

module.exports = router;