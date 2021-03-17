import express from 'express';
const router = express.Router();
router.get('/products',(req,res)=>{
    res.json({
        message : "huy"
    })
})
router.get('/products/:id',(req,res)=>{
   console.log(req.params.id);
//    console.log(req.query);
   res.send(req.params.id);
})
module.exports = router;