import OrderDetail from '../model/orderDetail'
import formidable from 'formidable'
import _ from 'lodash';
export const Create = (req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtenstions = true;
    form.parse(req, (err,fields) => {
        if(err){
            return res.json.status(400)({
                error : "k thêm được orderDetail"
            })
        }
        //  kiểm tra dữ liệu có được nhập hay k
        const { id_product,name,image,price,cate_id,status,sl,id_order,} = fields ;
        if(!id_product || !name || !image || !price ||!cate_id || !status || !sl || !id_order ){
            return res.json.status(400)({
                error : " không được để trống !"
            })
        }

        let orderDetail = new OrderDetail(fields);

        orderDetail.save((err,data)=>{
            if(err){
                res.status(400).json({
                    error : "Thêm orderDetail không thành công 😂"
                })
            }
            res.json(data);
        })
    
    })
}
export const List = (req,res) =>{
    OrderDetail.find((err,data)=>{
        if(err){
            res.status(400).json({
                error : "k tim thay order detail nao"
            })
        }
        res.json(data);
    })
}

