const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chatroomId : {
        type : mongoose.Types.ObjectId,
        required : true,
        index : true
    },
    messageCount : {
        type : Number,
        default : 0
    },
    messages : [{
        sender : {
            type : String
        },
        message : {
            type : String
        }
    }],    
},{
    toJSON:{
        transform:(doc, ret)=>{
            ret.createDate = ret._id.getTimestamp();
            delete ret._id;
            delete ret.__v;
            delete ret.chatroomId;
            delete ret.messageCount;
            return ret;
        }
    }
});

module.exports = mongoose.model('Chats',chatSchema);