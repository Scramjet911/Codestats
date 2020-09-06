const Chatrooms = require('../models/chatroom');
const Chats = require('../models/chats');
const User = require('../models/user');
const socketjwt = require('socketio-jwt');
const mongoose = require('mongoose');
const chatroom = require('../models/chatroom');

const MaxChatMsg = 100;

exports.checkUser = (req, res, next)=>{
    if(req.auth){
        User.findById(req.auth._id,(err,user)=>{
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            else{
                if(user && user.username == req.params.username){
                    // console.log(user.username,req.params.username);
                    next();
                }
                else{
                    res.status(400).send("Unauthorized");
                }
            }
        });
    }
    else{
        res.status(400).send("Unauthorized");
    }
}

exports.getChatrooms = (req, res)=>{
    Chatrooms.find({$or:[{'user1':req.params.username}, {'user2':req.params.username}]},(err,rooms)=>{
        if(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
        else{
            let resrooms = [];
            if(rooms.length>0){
                resrooms = rooms.map(room=>room.toJSON());
            }
            res.status(201).json(resrooms);
        }
    });
}

exports.getChat = (req, res)=>{
    let chatdate = new Date(req.params.date), chatdateId;
    if(!(req.params.date) || (chatdate && chatdate>Date.now())){
        chatdate = new Date();
    }
    chatdateId = mongoose.Types.ObjectId.createFromTime(chatdate/1000);
    // console.log(chatdateId.getTimestamp()+'\n'+chatdate.toISOString());
    // Chats.find({'chatroomId':req.params.chatroomId},(err,t)=>console.log(t));
    Chats.findOne({'chatroomId':req.params.chatroomId, "_id":{$lt:chatdateId}}, {}, {sort:{"_id":-1}}, (err,chat)=>{
        if(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
        else{
            // console.log(chat.toJSON());
            if(chat)
                res.status(201).json(chat.toJSON());
            else
                res.status(201).json({});
        }
    });
}

/*  Start chat with new user
    req : {
        to:username
    }
 */
exports.createChatroom = async (req, res, next)=>{
    // console.log(req.body.to);
    let result;
    try{
        result = await User.exists({"username":req.body.to});
        if(!result){
            res.status(404).send("User Not Found");
            return next();
        }
        else{
            Chatrooms.findOne({$or:[{"user1":req.body.to,"user2":req.params.username}, {"user1":req.params.username,"user2":req.body.to}]},(err, chatroom)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Server Error");
                }
                else{
                    // If Chatroom exists send chat
                    if(chatroom){
                        req.params.chatroomId = chatroom._id;
                        this.getChat(req,res);
                    }
                    else{
                        // console.log(chatroom);
                        Chatrooms.create({"user1":req.body.to,"user2":req.params.username}, (error,chatroom)=>{
                            if(error){
                                console.log(error);
                                res.status(500).send("Server Error");
                            }
                            else
                                res.status(201).json(chatroom.toJSON());
                        })
                    }
                }
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
        return next();
    }
    
    
}

exports.deleteChatroom = (req, res)=>{
    Chatrooms.findOneAndRemove({$or:[{"user1":req.body.to,"user2":req.params.username}, {"user1":req.params.username,"user2":req.body.to}]},(err,chatroom)=>{
        if(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
        else if(chatroom){
            Chats.deleteMany({chatroomId:chatroom._id},(error)=>{
                if(error){
                    console.log(error);
                    res.status(500).send("Server Error");
                }
                else{
                    res.status(201).send("Chat Deleted");
                }
            });
        }
    });
}

exports.initSocket = (socketio)=>{
    socketio.use(socketjwt.authorize({
        secret : process.env.SECRET,
        handshake : true,
    }));

    socketio.on('connect',socket=>{
        // console.log('User Connected');
        socket.on('joinUser', (username)=>{
            socket.join(username);
            console.log(username + ' Joined Own Room');
        });
        socket.on('disconnect',()=>{
            // console.log('User Disconnected');
        });
        socket.on('privateMessage',async(from, to, msg)=>{
            console.log(from, to, msg);
            Chatrooms.findOneAndUpdate({$or:[{"user1":from,"user2":to}, {"user1":to,"user2":from}]}, {$setOnInsert:{"user1":from,"user2":to}}, {upsert : true, new:true}, (err,chatroom)=>{
                console.log(chatroom);
                if(err){
                    console.log(err);
                }
                else{
                    let query = {chatroomId:chatroom._id, messageCount:{$lt:MaxChatMsg}},
                    chats = {$setOnInsert:{chatroomId:chatroom._id}, $push:{messages : {sender : from, message : msg}}, $inc:{messageCount:1}},
                    queryoptions = {upsert : true, setDefaultsOnInsert : true};
    
                    Chats.findOneAndUpdate(query, chats, queryoptions, (error)=>{
                        if(error){
                            console.log(error);
                        }
                    });
                }
            });
            socket.in(to).emit('newMessage',{sender : from, message : msg});
        });
    });
    
    console.log('Socket Initialized');
}
