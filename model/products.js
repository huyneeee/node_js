import mongoose from 'mongoose'
const { ObjectId } =  mongoose.Schema;
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required: true,
        maxLength:32
    },
    description : {
        type : String ,
        required : true,
        maxLength : 2000
    },
    price : {
        type : Number ,
        trim : true,
        required : true ,
        maxLength : 32,
    },
    quantity : {
        type : Number
    },
    image : {
        data : Buffer,
        contentType : String
    },
    status : {
        type : Boolean,
        required : true     
    },
    cate_id : {
        type : ObjectId,
        ref : "Category",
        required : true
    }

},{ timestamps : true})
module.exports = mongoose.model ("Product",productSchema);