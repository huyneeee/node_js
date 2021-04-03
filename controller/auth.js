import User from '../model/user';

export const signup = (req,res) => {
    // res.status(200).json({
    //     message : "oki",
    //     data : req.body
    // })
    // console.log('request body',req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            res.status(400).json({
                error : "k thể thêm user"
            })
        }
        res.json({user})
    })
}