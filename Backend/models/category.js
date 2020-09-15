const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        maxlength:32
    },
    posts:[{
        type:ObjectId,
        ref:"Article"

    }],
    resourceCount:{
        type:Number,
        default:0
    }
},
{timestamps:true});


module.exports=mongoose.model("Category",categorySchema,)