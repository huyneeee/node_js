import express from 'express';
import { signup,signin, signout } from '../controller/auth';
import {userSignupValidator} from '../validator';
const router = express.Router();

router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);
module.exports = router;