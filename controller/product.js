import Product from '../model/products'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'
export const Create = (req, res) => {

  let form = formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, field) => {
    if (err) {
      return res.status(400).json({
        error: "400 error add product"
      })
    }
    //kiem tra du lieu co duoc nhap hay k
    const { name, description, price ,cate_id,image} = fields;
    if (!name || !price || !description ||!image) {
      return res.status(400).json({
        error: "ban can dien day du thong tin"
      })
    }
    let product = new Product(fields);
    // if (files.image) {
    //   if (files.image.size < 0) {
    //     res.status(400).json({
    //       error: " ban nen up anh < 1MB"
    //     })
    //   }
    //   product.image.data = fs.readFileSync(files.image.path);
    //   product.image.contentType = files.image.type;

    // }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "them san pham  k thanh cong"
        })
      }
      res.json(data);
    })

  })
}

export const Read = (req, res) => {
  // req.product.image = undefined;
  return res.json(req.product);
}


export const Update = (req,res) =>{
  let form = formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "400 error update product"
      })
    }
    //kiem tra du lieu co duoc nhap hay k
    const { name, description, price } = fields;
    if (!name || !price || !description) {
      return res.status(400).json({
        error: "ban can dien day du thong tin"
      })
    }
    // let product = new Product(fields);
    let product = req.product;
    product = _.assignIn(product,fields);
    // if (files.image) {
    //   if (files.image.size < 0) {
    //     res.status(400).json({
    //       error: " ban nen up anh < 1MB"
    //     })
    //   }
    //   product.image.data = fs.readFileSync(files.image.path);
    //   product.image.contentType = files.image.type;

    // }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "update san pham  k thanh cong"
        })
      }
      res.json(data);
    })

  })
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
// router.get("/product/photo/:productId", photo)
// export const image = (req,res) =>{
//   if(req.product.image.data){
//     res.set("Content-Type",req.product.image.content-type);
//     return res.send(req.product.image.data);
//   }
//   next();
// }
