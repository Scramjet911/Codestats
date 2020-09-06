const Article =require("../models/article");
const Comment = require("../models/articlecomment")

const formidable = require("formidable");
const _ =require("lodash");
const fs =require('fs');
const path =require("path");
const {validationResult} = require('express-validator');
const { forEach } = require("lodash");
const { Mongoose } = require("mongoose");


exports.getArticleById = (req,res,next,id) =>{
    Article.findById(id)
    .populate("category")
    .exec((err,article)=>{
        if(err){ 
            return res.status(400).json({
                error:"Article not found"
            });
        }
        req.article = article;
        next();
    })
};
exports.getCommentById = (req,res,next,id) =>{
    Comment.findById(id)
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

exports.createArticle = (req,res) =>{   

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const article=new Article(req.body);
    article.authorname=req.profile.username;
    article.save((err,article)=>{
        if(err){
            res.status(400).json({
                err:err,
                error:"saving new article is failed"
            })
        }
        let user =req.profile;
        user.posts.push(article._id);
        user.save((err)=>{
                    if(err){
                        res.status(400).json({
                            error:"updation of user is failed"
                        })
                    }
                   
                })

        res.json(article);
    })

};
exports.updateArticle =(req,res)=>{
    if(req.params.userId!=req.article.author){
        return res.status(400).json({
            error:"you are not the author of this article"
        });
    }
    Article.findByIdAndUpdate(
        {_id:req.article._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,article)=>{
            if(err){
                return res.status(400).json({
                    error:"you are not authorized to update this article"
                });

            }
            res.json(article);
        }
    )

}

exports.deleteArticle = (req,res)=>{

    let article=req.article;
    let user =req.profile;
    //console.log(user._id,article.author)
    if(String(user._id) == String(article.author)){
        article.comments.forEach(item=>{
            Comment.findById(item,(err,comment)=>{
                if(err){
                    return res.status(400).json({
                        error:"canot find the comments of the article"
                    });
    
                }
                comment.remove((err)=>{
                    if(err){
                        return res.status(400).json({
                            error:"canot delete this comment of the article"
                        });
        
                    }
                })
            })
        });
        user.posts.pull(article._id);
        user.save((err)=>{
            if(err){
                return res.status(400).json({
                    err:"cannot delete in user posts"
                })
            }
        })
        article.remove((err,art)=>{
            if(err){
                return res.status(400).json({
                    error:"can not delete this article"
                })
            }
            res.status(400).json({
                msg:"article deleted successfully",
                authorname:user._id,
                arti:article.author

            })
        })

    }
    else{
        return res.status(400).json({
            msg:"canot delete article ,you are not author" ,
                authorname:user._id,
                arti:article.author
        })
    }
    
}

exports.uploadImage = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.uploadDir='./public/uploads';
    form.maxFieldsSize=5*1024*1024;    //5MB
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        var d=new Date().getTime()
        
        var newname =path.join(__dirname,'../',form.uploadDir,req.params.userId+'_'+d+'_'+file.photo.name);
        //var n_name=req.params.userId+'_'+d+'_'+file.photo.name
        var oldpath=""
       oldpath+= file.photo.path
        fs.rename(oldpath,newname,(err)=> {
            if (err){
                return res.status(400).json({

                    err:err,
                    error:"..problem with rename..."
                })
            }
            
            res.json({
                path:newname
            })
        });

    });


};

exports.getAllArticle =(req,res) =>{
    let limit=req.query.limit?parseInt(req.query.limit) :8
    let sortBy=req.query.sortBy?req.query.sortBy :"createdAt"
    Article.find()
   // .populate("author",'username')
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,articles)=>{
        if(err){
            return res.status(400).json({
                error:"no article found"
            });

        }
        res.json(articles)
    })
}
exports.savingArticle = (req,res)=>{
    let user = req.profile;
    user.savedarticles.push(req.article._id);
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error:"can not save this articel.."
            })
        }
        res.json({
            msg:"saved"
        })
    })
}
exports.deletesavingArticle = (req,res)=>{
    let user = req.profile;
    user.savedarticles.pull(req.article._id);
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error:"can not delete this list.."
            })
        }
        res.json({
            msg:" deleted"
        })
    })
}
exports.like = (req,res)=>{
    let user = req.profile;
    user.likedarticles.push(req.article._id);
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
    });
   let  article= req.article;
    article.like.push(user._id);
    article.like_count+=Number(1);

    article.save((err)=>{
        if(err){
            return res.status(400).json({
                error:"can not like this article"
            })
        }
         res.json({
            msg:"liked..",
            like:article.like_count

         })
    })
}
exports.unlike = (req,res)=>{
    let user = req.profile;
    user.likedarticles.pull(req.article._id);
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
    });
   let  article= req.article;
    article.like.pull(user._id);
    article.like_count-=Number(1);
    article.save((err)=>{
        if(err){
            return res.status(400).json({
                error:"can not like this article"
            })
        }
         res.json({
            msg:"unliked..",
            like:article.like_count
         })
    })
}
    //{
    //      "body":"comment"
    //  }

exports.createComment = (req,res)=>{
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(422).json({
    //         error:errors.array()[0].msg
    //     })
    // }
    
    let article= req.article;
    let user = req.profile;
    const comment =new Comment(req.body);
    comment.article=article._id;
    comment.author =user._id;
    comment.save((err,comment)=>{
        if(err){
            return res.json({
                error:"comment not saved.."
            })
        }
        user.comment_hist.push(comment._id);
        article.comments.push(comment._id);
        user.save((err)=>{
            if(err){
                return res.json({
                    error:"comment not saved in user"
                })
            }
            article.save((err)=>{
                if(err){
                    return res.json({
                        error:"comment not saved in article..."
                    })
                }
            })

        })
        res.status(400).json({
            msg:"comment saved successfully.."
        })
    })


}

exports.deleteComment= (req,res)=>{
    id=req.params.id;
    let user =req.profile;
    let article = req.article;
    Comment.findById(id,(err,comment)=>{
       // console.log(comment)
        if(err || String(comment.author)!= String(user._id)){
            return res.json({
                error:"can not find this comment"
            })
        }
        comment.remove((err,comment)=>{
            if(err){
                return res.json({
                    error:"can not delete this comment"
                })
            }
            user.comment_hist.pull(comment._id);
            article.comments.pull(comment._id);
            user.save();
            article.save()
            res.status(400).json({
                msg:"comment deleted successfully"
            })
    })
    })
    
}
// req.body
//
//  {
//      "body":"comment"
//  }
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
// for get all comments of a article
exports.getAllcomment =(req,res) =>{
    let limit=req.query.limit?parseInt(req.query.limit) :5
    let sortBy=req.query.sortBy?req.query.sortBy :"createdAt"
    let art = req.article;
    Comment.find({article : art._id})
   .populate("author",'username')
   .populate("article",'title')
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,comments)=>{
        if(err){
            return res.status(400).json({
                error:"no article found"
            });

        }
        res.json(comments)
    })
}