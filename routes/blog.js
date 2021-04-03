import express from 'express'

import { List , Create,Read ,Update,Delete, blogId } from '../controller/blog'

const router = express.Router();

router.get('/blog',List);

router.post('/blog',Create);

router.get('/blog/:blogId',Read);

router.put('/blog/:blogId',Update);

router.delete('/blog/:blogId',Delete);

router.param('blogId',blogId);

module.exports = router;