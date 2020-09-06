const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;

var discussioncommentschema = new mongoose.Schema({
    author:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    discussion:{
        type:ObjectId,
        ref:'Discussion',
        required:true

    },
    body:{
        type:String,
        required:true
    }


},
{timestamps:true})
module.exports = mongoose.model('discussioncomment',discussioncommentschema);