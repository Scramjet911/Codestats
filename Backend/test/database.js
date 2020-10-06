const article = require("../models/article");
const articlecomment = require("../models/articlecomment");
const category = require("../models/category");
const chatroom = require("../models/chatroom");
const chats = require("../models/chats");
const discusisoncomment = require("../models/discusisoncomment");
const discussion = require("../models/discussion");
const { Events, EventsReview } = require("../models/events");
const {Resources} = require("../models/resources");
const User = require("../models/user");

exports.CreateUser = async (name) => {
    let user = new User({
        username: name,
        name: name,
        email: `${name}@gmail.com`,
        confirmed: "true",
        password: name,
    });
    user.save((err) => {
        if (err) console.log(err);
    });
};

exports.CreateAdmin = async (name) => {
    let user = new User({
        username: `${name}`,
        name: `${name} Admin`,
        email: `${name}@gmail.com`,
        confirmed: "true",
        password: `${name}`,
        role: 1,
    });
    user.save((err) => {
        if(err){
            console.log(err);
            return 0;
        }    
        else
            return 1;
    });
};

exports.DeleteUser = async (name) => {
    User.deleteOne({ username: name }, (err) => {
        if (err){
            console.log(err);
            return 0;
        }
        else{
            return 1;
        }
    });
};

exports.ClearAllCollections = async() => {
    let collections = [
        User,
        Events,
        EventsReview,
        chatroom,
        chats,
        article,
        articlecomment,
        discussion,
        discusisoncomment,
        Resources,
        category,
    ];
    return Promise.all(collections.map((Collection) => {
        // console.info(Collection);
        return new Promise((resolve)=>{
            Collection.deleteMany({}, (err) => {
                if (err) {
                    console.log("Database Error : ", err);
                }
                else
                    resolve();
            });
        });
    }));
};
