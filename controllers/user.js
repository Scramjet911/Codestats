const User = require("../models/user");
const {Events} = require("../models/events");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const mongoose = require("mongoose");


exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        } 
        req.profile =user;
        next();
    });
};

exports.getUser = (req,res)=>{
    req.profile.salt =undefined;
    req.profile.encry_password= undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    if(req.profile.photo.data){
        req.profile.photo=undefined;
    }
    
   // console.log(req.prfile);
    return res.json(req.profile)

};
exports.photo = (req,res,next)=>{
    if(req.profile.photo.data){
        res.set("content-Type",req.profile.photo.contentType)
        return res.send(req.profile.photo.data);
    }
    next();
}

//update user
exports.updateUser = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        //updation code
        let user = req.profile;
        user = _.extend(user,fields)

        //handle file here

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"file size is too big!"
                })
            }
            user.photo.data=fs.readFileSync(file.photo.path);
            user.photo.contentType = file.photo.type
        }
        //saving updated user
        user.save((err,user)=>{
            if(err){
                res.status(400).json({
                    error:"updation of user is failed"
                })
            }
            res.json(user);
        })

    });
};

exports.follow=(req,res)=>{
    let user = req.profile;
    User.findById(req.params.id,(err,follow)=>{
        if(err){
            res.status(400).json({
                error:"this user not found"
            })
        }
        user.following.push(follow._id);
        follow.followers.push(user._id);
        user.save((err)=>{
            if(err){
                res.status(400).json({
                    error:"following failed"
                })
            }
            follow.save((err)=>{
                if(err){
                    res.status(400).json({
                        error:"following failed.."
                    })
                }
            })
            res.status(400).json({
                msg:"followed"
            })
        
        })
        
    })
}

exports.unfollow=(req,res)=>{
    let user = req.profile;
    User.findById(req.params.id,(err,follow)=>{
        if(err){
            res.status(400).json({
                error:"this user not found"
            })
        }
        user.following.pull(follow._id);
        follow.followers.pull(user._id);
        user.save((err)=>{
            if(err){
                res.status(400).json({
                    error:"unfollowing failed"
                })
            }
            follow.save((err)=>{
                if(err){
                    res.status(400).json({
                        error:"unfollowing failed.."
                    })
                }
            })
            res.status(400).json({
                msg:"unfollowed"
            })
        })
    })
}

/* Will send array containing event id, title, date */
exports.getSavedEvents = (req, res)=>{
    User.findById(req.params.userId, async (err,user)=>{
        if(err){
            res.status(500).send("Server Error");
            return;
        }
        try{
            let retEvents = user.savedEvents;
            let resEvents = await Promise.all(retEvents.map(async e=>{
                let elem = await Events.findById(mongoose.Types.ObjectId(e));
                delete elem.description;
                delete elem.duration;
                return elem;
            }));
            res.status(201).json(resEvents);
        }
        catch(error){
            console.log("Server Error",error);
            res.status(500).send("Server Error");
        }
    });
}

/* Request needs only EventId */
exports.saveEvent = (req, res)=>{
    User.findByIdAndUpdate(req.params.userId,{$addToSet : {savedEvents:req.body.eventId}},(err,doc)=>{
        if(err){
            console.log("Unable to Add to Saved Events",err);
            res.status(500).send("Server Error");
        }
        else{
            // console.log("Saved Event",doc);
            res.status(201).send("Success");
        }
    });
}

/* Request Needs only EventID */
exports.deleteSavedEvent = (req, res)=>{
    User.findByIdAndUpdate(req.params.userId,{$pull : {savedEvents:req.body.eventId}},(err,doc)=>{
        if(err){
            console.log("Unable to Delete Saved Events",err);
            res.status(500).send("Server Error");
        }
        else{
            console.log("Deleted Saved Event",doc);
            res.status(201).send("Success");
        }
    });
}