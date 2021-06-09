import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true,
        required : true,
        maxLength : 100
    },
    content : {
        type : String ,
        trim : true ,
        required : true ,
        maxLength : 2000
    },
    image : {
        type:String
    }
},{timestamps : true})
module.exports = mongoose.model ("Blog",blogSchema); 