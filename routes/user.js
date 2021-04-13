import express from 'express'

import { isAuth, isAdmin, requireSignin } from '../controller/auth';
import { List, userById,Read } from '../controller/user';

const router = express.Router();

router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
});

router.get('/users',List);
router.get('/user/:userId',requireSignin,isAuth,Read);
// router.put('/user/:userId',requireSignin,isAuth,update);
router.param('userId',userById);
module.exports = router;