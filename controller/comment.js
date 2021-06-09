import Comment from '../model/comment'
import _ from 'lodash'

export const commentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
        if (err) {
            return res.status(400).json({
                error: " k tìm thấy comment"
            })
        }
        req.comment = comment;
        next();
    })
}


export const Create = (req, res) => {


    let comment = new Comment(req.body);

    comment.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Thêm comment không thành công 😂"
            })
        }
        res.json(data);
    })


}
export const commentByProduct = (req, res, next, id) => {
    Comment.find({ id_product: id }).exec((err, comment) => {
        if (err) {
            return res.status(400).json({
                error: "K tìm thấy comment"
            })
        }
        req.comment = comment;
        next();
    })
}
export const Read = (req, res) => {
    return res.json(req.comment)
}
export const Delete = (req, res) => {
    let comment = req.comment;
    comment.remove((err, deleteComment) => {
        if (err) {
            return res.status(400).json({
                error: "K thể xóa comment"
            })
        }
        res.json({
            message: "Xóa comment thành công ~"
        })
    })
}
export const List = (req, res) => {
    Comment.find((err, data) => {
        if (err) {
            res.status(400).json({
                error: "List comment k thành công"
            })
        }
        res.json(data);
    })
}
export const CountCommentByProduct = (req,res)=>{
    const productId= req.query.productId;
    Comment.count({id_product:productId}).exec((err,data)=>{
        if(err){
            res.status(400).json({
                error : "k thể đếm comment"
            })
        }
        res.json(data);
    })
}