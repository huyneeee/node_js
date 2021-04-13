import Comment from '../model/comment'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'


export const Create = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtenstions = true;
    form.parse(req, (err,fields) => {
        if(err){
            return res.json.status(400)({
                error : "404 k thể thêm danh mục1"
            })
        }
        //  kiểm tra dữ liệu có được nhập hay k
        const {  content  } = fields ;
        if(!content ){
            return res.json.status(400)({
                error : " không được để trống !"
            })
        }

        let comment = new Comment(fields);

        comment.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm comment không thành công 😂"
                })
            }
            res.json(data);
        })
    
    })


}
export const commentId = (req,res,next,id) =>{
    Comment.findById(id).exec((err,comment)=>{
        if(err){
            return res.status(400).json({
                error : "K tìm thấy comment"
            })
        }
        req.comment = comment;
        next();
    })
}
export const Read = (req,res) =>{
    return res.json(req.comment)
}
export const Delete = (req,res) =>{
    let comment = req.comment;
     comment.remove((err,deleteComment)=>{
         if(err){
             return res.status(400).json({
                 error : "K thể xóa comment"
             })
         }
         res.json({
             deleteComment,
             message : "Xóa comment thành công ~"
         })
     })
}
export const List = (req,res) =>{
    Comment.find((err,data)=>{
        if(err){
            res.status(400).json({
                error : "List comment k thành công"
            })
        }
        res.json(data);
    })
}