import Order from '../model/order'
import formidable from 'formidable'
import _ from 'lodash';
export const Create = (req,res)=>{
   
        let order = new Order(req.body);
        order.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm order không thành công 😂"
                })
            }
            res.json(data);
        })
}
export const orderId = (req,res,next,id)=>{
    Order.findById(id).exec((err,order)=>{
        if(err){
            res.status(400).json({
                error : "K tìm thấy order"
            })
        }
        req.order = order;
        next();
    })
}
export const Read = (req,res)=>{
    return res.json(req.order);
}
export const Delete = (req,res)=>{
    let order = req.order;
    order.remove((err,deleteOrder)=>{
        if(err){
            res.status(400).json({
                error : "K xóa được order"
            })
        }
        res.json({
            deleteOrder,
            massage : "Xóa thành công"
        })
    })
}
export const List = (req,res)=>{
    Order.find((err,data)=>{
        if(err){
            res.status(400).json({
                error : "K tìm thấy order nào"
            })
        }
        res.json(data);
    })
}