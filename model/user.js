import crypto from  'crypto';
import  mongoose  from 'mongoose';
import uuid from 'uuid';

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true,
        required : true,
        maxLength : 32
    },
    email : {
        type : String ,
        trim : true,
        required : true,
        maxLength : 200
    },
    password : {
        type : String,
        required : true,
    },
    passwordHash : {
        type : String ,
        required : false
    }
    ,
    salt : {
        type : String
    },
    about : {
        type : String
    },
    role : {
        type : Number,
        default : 0
    },
    history : {
        type : Array,
        default : []
    }

},{timestamps : true})
module.exports = mongoose.model("User",userSchema);
