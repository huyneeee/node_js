import Blog from '../model/blog'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const Create = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtenstions = true;
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.json.status(400)({
                error : "404 k thể thêm danh mục1"
            })
        }
        //  kiểm tra dữ liệu có được nhập hay k
        const { name , content  } = fields ;
        if(!name || !content ){
            return res.json.status(400)({
                error : " không được để trống !"
            })
        }

        let blog = new Blog(fields);

        if(files.image){
            if(files.image.size < 0){
                res.status(400).json({
                    error : "ảnh quá nhỏ k thể upload"
                })
            }
        }

        blog.image.data = fs.readFileSync(files.image.path);
        blog.image.contentType = files.image.type;

        blog.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm blog không thành công 😂"
                })
            }
            res.json(data);
        })
    
    })


}

export const Read = (req,res) =>{
    return res.json(req.blog);
}

export const Update = (req,res) =>{
    let form = formidable.IncomingForm();
    form.keepExtenstions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "400 error update blog"
        })
      }
      //kiem tra du lieu co duoc nhap hay k
      const { name, content } = fields;
      if (!name  || !content) {
        return res.status(400).json({
          error: "ban can dien day du thong tin"
        })
      }
      // let blog = new blog(fields);
      let blog = req.blog;
      blog = _.assignIn(blog,fields);
      if (files.image) {
        if (files.image.size < 0) {
          res.status(400).json({
            error: " ban nen up anh < 1MB"
          })
        }
        blog.image.data = fs.readFileSync(files.image.path);
        blog.image.contentType = files.image.type;
  
      }
      blog.save((err, data) => {
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




