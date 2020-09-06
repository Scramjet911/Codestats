const Discussion =require ('../models/discussion')
const Comments = require('../models/discusisoncomment')
const User =require("../models/user")

const {validationResult} = require('express-validator');

exports.getDiscussionById = (req,res,next,id)=>{
    Discussion.findById(id)
    .populate("category")
    .exec((err,discussion)=>{
        if(err){
            return res.status(400).json({
                error:"can not get article"
            })
        }
        req.discussion = discussion
        next();
    })
}
exports.getCommentById = (req,res,next,id) =>{
    Comments.findById(id)
    .exec((err,comment)=>{
        if(err){ 
            return res.status(400).json({
                error:"comment not found"
            });
        }
        req.comment =comment;
        next();
    })
};

exports.createDiscussion = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const discussion = new Discussion(req.body);
    discussion.authername=req.profile.name;
    discussion.save((err,discussion)=>{
        if(err){
            return res.status(400).json({
                error:"can not save this discussion"
            })
        }
        let user = req.profile;
        user.discussion.push(discussion._id);
        user.save((err)=>{
            if(err){
                return res.status(400).json({
                    error:"can not save this discussion in user"
                })
            }
        })
        res.json(discussion);
        
    })
}

exports.updateDiscussion= (req,res)=>{
    if(req.params.userId!=req.discussion.author){
        return res.status(400).json({
            error:"you are not the author of this discussion"
        });
    }
    Discussion.findByIdAndUpdate(
        {_id:req.discussion._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,discussion)=>{
            if(err){
                return res.status(400).json({
                    error:"you are not authorized to update this article"
                });

            }
            res.json(discussion);
        }
    )
}
exports.getAllDiscussion = (req,res)=>{
    Discussion.find()
    .populate("comments")
    .exec((err,discussion)=>{
        if(err){
            return res.status(400).json({
                err:"can not get all discussion"
            })
        }
        res.json(discussion)
    })

}

exports.deleteDiscussion= (req,res)=>{
    let discussion=req.discussion;
    let user =req.profile;
    //console.log(user._id,article.author)
    if(String(user._id) == String(discussion.author)){
        discussion.comments.forEach(item=>{
            Comments.findById(item,(err,comment)=>{
                if(err){
                    return res.status(400).json({
                        error:"canot find the comments of the discussion"
                    });
    
                }
                User.findById(comment.author,(err,person)=>{
                    if(err){
                        return res.status(400).json({
                            err:"can not find the owner of this comment"
                        })
                    }
                    person.disc_comments.pull(comment._id);
                    person.save((err)=>{
                        if(err){
                            return res.status(400).json({
                                err:"can not save person"
                            })
    
                        }
                                            })
                })
                comment.remove((err)=>{
                    if(err){
                        return res.status(400).json({
                            error:"canot delete this comment of the discussion"
                        });
        
                    }
                })
            })
        });
        user.discussion.pull(discussion._id);
        user.save((err)=>{
            if(err){
                return res.status(400).json({
                    err:"cannot delete in user discussion"
                })
            }
        })
        discussion.remove((err,disc)=>{
            if(err){
                return res.status(400).json({
                    error:"can not delete this discussion"
                })
            }
            res.status(400).json({
                msg:"discussion deleted successfully",
                authorname:user._id,
                disc:disc.author

            })
        })

    }
    else{
        return res.status(400).json({
            msg:"canot delete article ,you are not author" ,
                authorname:user._id,
                disc:disc.author
        })
    }
    

}

exports.createComment = (req,res)=>{
    let discussion =req.discussion;
    let user= req.profile;
    const comment =new Comments(req.body);
    comment.author=user._id;
    comment.discussion=discussion._id;
    comment.save((err,comment)=>{
        if(err){
            return res.status(400).json({
                err:"can not save this comment"
            })
        }
        user.disc_comments.push(comment._id);
        discussion.comments.push(comment._id);
        user.save((err)=>{
            if(err){
                return res.json({
                    error:"comment not saved in user"
                })
            }
            discussion.save((err)=>{
                if(err){
                    return res.json({
                        error:"comment not saved in discussion..."
                    })
                }
            })

        })
        res.json(comment);

    })
}
exports.updateComment= (req,res)=>{
    comment =req.comment;
    comment.body = req.body.body;
    comment.save((err)=>{
        if(err){
            return res.json({
                err:err,
                error:"can not update this comment",
                comment:comment
            })
        }
        res.status(400).json({
            body:comment.body,
            msg:"comment updated successfully"
        })
})


}
exports.deleteComment= (req,res)=>{
    id=req.comment._id
    let user =req.profile;
    let discussion = req.discussion;
    Comments.findById(id,(err,comment)=>{
       // console.log(comment)
        if(err || String(comment.author._id)!= String(user._id)){
            return res.json({
                error:"can not find this comment or you are not authorised"
            })
        }
        comment.remove((err,comment)=>{
            if(err){
                return res.json({
                    error:"can not delete this comment"
                })
            }
            user.disc_comments.pull(comment._id);
            discussion.comments.pull(comment._id);
            user.save();
            discussion.save()
            res.status(400).json({
                msg:"comment deleted successfully"
            })
    })
    })
    
}
exports.getAllComments = (req,res)=>{
    let disc =req.discussion
    Comments.find({discussion : disc._id})
   .populate("author",'username')
   .populate("discussion",'title')
    .exec((err,comments)=>{
        if(err){
            return res.status(400).json({
                error:"no article found"
            });

        }
        res.json(comments)
    })
}