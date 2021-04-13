import mongoose from 'mongoose'
const { ObjectId } =  mongoose.Schema;
const commentSchema = new mongoose.Schema({
    id_user : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    id_product : {
        type : ObjectId,
        ref : "Product",
        required : true
    },
    content : {
        type : String,
        length : 500
    }
},{timestamp : true})
module.exports = mongoose.model ("Comment",commentSchema);