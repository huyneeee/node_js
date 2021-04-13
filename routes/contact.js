import express from 'express'
import { contactId, Create,Delete,Read,List } from '../controller/contact';
const router = express.Router();

router.post('/contact',Create);
router.get('/contact/:contactId',Read);
router.delete('/contact/:contactId',Delete);
router.param('contactId',contactId);
router.get('/contact',List);
module.exports = router;