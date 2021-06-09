import express from 'express'

import { isAuth, isAdmin, requireSignin, checkPassword } from '../controller/auth';
import { List, userById,Read, Delete ,Update} from '../controller/user';

const router = express.Router();

router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
});

router.get('/users',List);

router.delete('/user/:userId/:userId',requireSignin,isAuth,isAdmin,Delete);

router.get('/user/:userId',Read);

router.get('/users/:userId',requireSignin,isAuth,Read);

router.put('/user/:userId/:userId',requireSignin,isAuth,isAdmin,Update);

router.post('/checkpassword/:userId',checkPassword);

router.param('userId',userById);



module.exports = router;