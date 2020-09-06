const mongoose = require('mongoose');
const chatRoomSchema = new mongoose.Schema({
    user1 : {
        type : String,
        required : true,
    },
    user2 : {
        type : String,
        required : true,
    }
},{
    toJSON : {
        transform : (doc,ret)=>{
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

chatRoomSchema.index({user1:1,user2:1});
chatRoomSchema.index({user2:1,user1:1});

module.exports = mongoose.model('Chatrooms',chatRoomSchema);