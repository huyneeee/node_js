import express from 'express'

import { List , Create , CategoryId, Read,Delete ,Update} from '../controller/category'
import { isAuth, isAdmin, requireSignin } from '../controller/auth';
import { userById } from '../controller/user';

const router = express.Router();

router.get('/category',List);

router.post('/category/:userId',requireSignin,isAuth,isAdmin,Create);

// router.post("/category", requireSignin, isAuth, isAdmin, Create);

router.get('/category/:categoryId',Read);

router.put('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,Update);

router.delete('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,Delete);

router.param('categoryId',CategoryId);

router.param('userId',userById);

module.exports = router;