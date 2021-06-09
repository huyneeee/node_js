import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth';
import { Create, List,commentByProduct,Read, Delete ,commentById, CountCommentByProduct} from '../controller/comment';
import { userById } from '../controller/user'
const router = express.Router();

 router.post('/comment',Create);

router.get('/comment',List);

router.get('/comment/:commentByProduct',Read);

router.delete('/comment/:commentId/:userId',requireSignin,isAuth,isAdmin,Delete);

router.post('/commentCountProductId',CountCommentByProduct);

router.param('commentByProduct',commentByProduct);

router.param('userId',userById);

router.param('commentId',commentById);

module.exports = router;