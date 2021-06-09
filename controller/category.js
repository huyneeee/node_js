import Category from '../model/category'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const Create = (req,res) => {
  
        let category = new Category(req.body);

        category.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm danh mục không thành công 😂"
                })
            }   
            res.json(data);
        })
}

export const Read = (req,res) =>{
    return res.json(req.category);
}

export const CategoryId = ( req,res,next,id) =>{
  Category.findById(id).exec((err,category) =>{
      if(err){
          return res.status(400).json({
              error : " k tìm thấy sản phẩm"
          })
      }
      req.category = category ;
      next();
  })
}

export const Update = (req,res) =>{
 
  Category.findOneAndUpdate(
    { _id  : req.category._id },
    { $set : req.body},
    {new : true },(err,category)=>{
      if(err){
        res.status(400).json({
          error : "Không thể update được category!"
        })
      }
      res.json(category);
    }
  )

}

export const Delete = (req,res) =>{
    let category = req.category;

    category.remove((err,deletecategory)=>{
      if(err){
        return res.status(400).json({
          error : "k xoa duoc category"
        })
      }
      res.json({
        deletecategory,
        message : "xoa category thanh cong !"
      }
      )
    })
}


export const List = (req,res)=>{
  Category.find((err,data)=>{
      if(err){
          return res.status(400).json({
            error : "k list category"
          })
        }
        res.json(data);
  })
}

