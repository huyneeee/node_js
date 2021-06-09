import express from 'express'

import { List , Create,Read ,Update,Delete, blogId } from '../controller/blog'

import { userById } from '../controller/user'
import { requireSignin,isAuth,isAdmin }  from '../controller/auth'

const router = express.Router();

router.get('/blog',List);

router.post('/blog/:userId',requireSignin,isAuth,isAdmin,Create);

router.get('/blog/:blogId',Read);

router.put('/blog/:blogId/:userId',requireSignin,isAuth,isAdmin,Update);

router.delete('/blog/:blogId/:userId',requireSignin,isAuth,isAdmin,Delete);

router.param('blogId',blogId);

router.param('userId',userById);

module.exports = router; 