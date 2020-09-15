const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;

var articlecommentschema = new mongoose.Schema({
    author:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    article:{
        type:ObjectId,
        ref:'Article',
        required:true

    },
    body:{
        type:String,
        required:true
    }


},
{timestamps:true})
module.exports = mongoose.model('Articlecomment',articlecommentschema);