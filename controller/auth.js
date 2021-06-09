const User = require('../model/user');
import jwt from 'jsonwebtoken';
const expressJwt = require('express-jwt');
import dotenv from 'dotenv';
dotenv.config();
export const signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            res.status(400).json({
                error: "k thể thêm user"
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({user})
    })
}
export const signin = (req, res) => {

    //find the user base on email
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                email:"email",
                error: "User with that email does not exist . Please signup!"
            })
        }

        //if user is found make sure email and passowrd hash
        //creat authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(400).json({
                password:"password",
                error: "Email and password not match"
            })
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // persist the token as 't' in cookie with
        res.cookie('userSignIn', token, { expire: new Date() + 9999 });
        //return res with user and token to fronend client
        const { _id , name , email , role,avatar} = user;
        return res.json({
            token,user : { _id,name,email,role,avatar}
        })
    })    

}
export const checkPassword = (req,res)=>{
    let user = req.profile; 
    let id = user._id;
    const { password } = req.body;
    User.findOne({_id:id}, (err, user) => {
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Password not match !"
            })
        }
        res.json({password})
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
})
export const signout = (req,res)=>{

    res.clearCookie('userSignIn');
    res.json({ 
        message : "SignOut "
    })
}
export const isAdmin = (req,res,next)=>{

    if(req.profile.role == 0){
        return res.status(403).json({
            error : "Bạn không phải là Admin !"
        })
    }
    next();
}
export const isAuth = (req,res,next)=>{
    // console.log(req.auth);

    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){ 
        return res.status(403).json({
            error : "Bạn không phải là nhân viên !"
        })
    }
    next();
}