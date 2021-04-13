import Category from '../model/category'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const Create = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtenstions = true;
    form.parse(req, (err,fields) => {
        if(err){
            return res.status(400).json({
                error : "404 k thể thêm danh mục1"
            })
        }
        //  kiểm tra dữ liệu có được nhập hay k
        const { name , description ,image } = fields ;
        if(!name || !description || !image){
            return res.status(400).json({
                error : " không được để trống !"
            })
        }

        let category = new Category(fields);

        category.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm danh mục không thành công 😂"
                })
            }   
            res.json(data);
        })
    
    }) 


}

export const Read = (req,res) =>{
    return res.json(req.category);
}

export const Update = (req,res) =>{
  let form = formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "400 error update category"
      })
    }
    //kiem tra du lieu co duoc nhap hay k
    const { name, description,image } = fields;
    if (!name  || !description || !image) {
      return res.status(400).json({
        error: "ban can dien day du thong tin"
      })
    }
    // let category = new category(fields);
    let category = req.category;
    category = _.assignIn(category,fields);

    category.save((err, data) => {
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

