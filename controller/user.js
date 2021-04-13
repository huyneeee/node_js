import User from '../model/user'

export const userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err : "User not found"
            })
        }
        req.profile = user;
        next();
    })
}

export const Read = (req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

export const List = (req,res)=>{
    User.find((err,data)=>{
        if(err){
            return res.status(400).json({
              error : "k tim thay user"
            })
          }
          res.json(data);
    })
  }
  
