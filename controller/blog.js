import Blog from '../model/blog'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const blogId = ( req,res,next,id) =>{
  Blog.findById(id).exec((err,blog) =>{
      if(err){
          return res.status(400).json({
              error : " k tìm thấy sản phẩm"
          })
      }
      req.blog = blog ;
      next();
  })
}

export const Create = (req,res) => {
   
        let blog = new Blog(req.body);

        blog.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm blog không thành công 😂"
                })
            }
            res.json(data);
        })
}

export const Read = (req,res) =>{
    return res.json(req.blog);
}

export const Update = (req,res) =>{
  Blog.findOneAndUpdate(
    { _id  : req.blog._id },
    { $set : req.body},
    {new : true },(err,blog)=>{
      if(err){
        res.status(400).json({
          error : "Không thể update được blog"
        })
      }
      res.json(blog);
    }
  )
}

export const Delete = (req,res) =>{
    let blog = req.blog;

    blog.remove((err,deleteBlog)=>{
      if(err){
        return res.status(400).json({
          error : "k xoa duoc blog"
        })
      }
      res.json({
        deleteBlog,
        message : "xoa blog thanh cong !"
      }
      )
    })
}

export const List = (req,res)=>{
    Blog.find((err,data)=>{
        if(err){
            return res.status(400).json({
              error : "k list duoc blog"
            })
          }
          res.json(data);
    })
}






