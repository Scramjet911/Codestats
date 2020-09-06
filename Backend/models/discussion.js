const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;
const discussionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authername:{
        type:String
    },
    author:{
            type:ObjectId,
            ref:"User",
            required:true
    },
    category:[{
        type:ObjectId,
        ref:"Category",
        required:true
    }],
    comments:[{
        type:ObjectId,
        ref:'discussioncomment'
    }],


},
{timestamps:true});

module.exports = mongoose.model("Discussion",discussionSchema);