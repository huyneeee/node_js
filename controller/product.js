import Product from '../model/products'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'
import mongoose from 'mongoose'
const { ObjectId } =  mongoose.Schema;
export const ProductById = (req, res, next, id) => {

  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "k tim thay san pham"
      })
    }
    req.product = product;
    next();
  })
}
export const Create = (req, res) => {

    const product = new Product(req.body);
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "them san pham  k thanh cong"
        })
      }
      res.json(data);
    })

}

export const Read = (req, res) => {
  // req.product.image = undefined;
  return res.json(req.product);
}


export const Update = (req,res) =>{
  Product.findOneAndUpdate(
    { _id  : req.product._id },
    { $set : req.body},
    {new : true },(err,product)=>{
      if(err){
        res.status(400).json({
          error : "Không thể update được product"
        })
      }
      res.json(product);
    }
  )

}
 
export const Delete = (req,res) =>{
  let product = req.product;
  product.remove((err,deleteProduct)=>{
    if(err){
      return res.status(400).json({
        error : "k xoa duoc product"
      })
    }
    res.json({
      deleteProduct,
      message : "xoa san pham thanh cong !"
    }
    )
  })
} 

export const List = (req, res) => {
  console.log(req.cookies);
  Product.find()
        // .select("image")
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json(data)
        })
}


export const ProductByCateId = (req,res,next,cate_id)=>{

    Product.find({cate_id:cate_id}).exec((err,product)=>{

        if(err){
          res.status(400).json({
            error : "k thay san pham theo cate"
          })
        }
        req.product = product;
        next();
      })
}

export const ProductByTextSearch = (req,res,next,textSearch)=>{
Product.find({"name": {$regex:textSearch,$options:'i'}}).exec((err,product)=>{

      if(err){
        res.status(400).json({
          error : "product not found for text search"
        })
      }
      req.product = product;
      next();
    })
}
export const ProductByPrice = (req,res)=>{
  let gte = req.query.gte;
  let lte = req.query.lte;
  Product.find({price:{$gte:gte,$lte:lte}}).exec((err,product)=>{
    if(err){
      res.status(400).json({
        error : "Product not found for price"
      })
    }
    req.product=product;
    res.json(req.product);
  })
}

export const ProductPagination = (req,res)=>{
  let page = req.query.page;
  let perPage = 6;
 
  Product.find({})
    .skip((perPage*page)-perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err,product)=>{
      if(err){
        res.status(400).json({
          error:"product not found page"
        })
      }
      // req.product=product;
      return res.json(product);
    })
    
}
export const countProduct = (req,res)=>{
  Product.count({}).exec((err,count)=>{
    if(err){
      return res.status(400).json({
        error : "k count duoc product"
      })
    }
    // req.product = count;
    return res.json(count);
  })
}