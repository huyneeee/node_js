import express from 'express'
import { Create, List } from '../controller/comment';

const router = express.Router();

 router.post('/comment',Create);
router.get('/comment',List)
module.exports = router;