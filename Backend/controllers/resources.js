const {Resources} = require('../models/resources')
const Category = require('../models/category');

const {validationResult} = require('express-validator');



exports.getResourceById= (req,res)=>{
    Resources.findById(req.params.id)
    .populate("category"),
    (err,resource)=>{
        if(err){ 
            return res.status(400).json({
                error:"Article not found"
            });
        }
        res.json(resource);
    }

}
exports.getResources = (req,res)=>{
    Category.find()
    .exec((err,category)=>{
        if(err){ 
            return res.status(400).json({
                error:"error in category"
            });
        }
        category.posts = undefined;
        res.json(category)
    })
}
exports.getAllResource= (req,res)=>{

    Resources.find({category:{$in:[req.params.categoryId]}})
    //.populate("category","name")
    .exec((err,resource)=>{
        if(err){ 
            return res.status(400).json({
                error:"resource not found"
            });
        }
        
        res.json(resource);
    });

}

exports.createResources = (req,res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    
    const resource=new Resources(req.body);

    resource.save((err,resource)=>{
        if(err){
            return res.status(400).json({
                error:"can not save this resource"
            })
        }
        const cat=resource.category;
        console.log(cat)
        cat.forEach(item => {
            Category.findById(item,(err,category)=>{
                if(err){
                    return res.status(400).json({
                        error:"Error occured choosing this category"
                    })
                }
                category.resourceCount+=1;
                category.save((err)=>{
                    if(err){
                        return res.status(400).jsErroon({
                            error:"r occured saving in this category"
                        })
                    }
                });
            })
            
        });

        res.json({
            msg:"saved successfully",
            resource
        })
    })
}
exports.updateResource =(req,res)=>{
    Resources.findById(req.params.id,(err,resource)=>{
        if(err){
            return res.status(400).json({
                error:"can not get this resource"
            })
        }
        const cat=resource.category;
        console.log(cat)
        cat.forEach(item => {
            Category.findById(item,(err,category)=>{
                if(err){
                    return res.status(400).json({
                        error:"Error occured choosing this category"
                    })
                }
                category.resourceCount-=1;
                category.save((err)=>{
                    if(err){
                        return res.status(400).jsErroon({
                            error:"error occured saving in this category"
                        })
                    }
                });
            })
            
        });

    })
    
    Resources.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,resource)=>{
            if(err){
                return res.status(400).json({
                    err:err,
                    error:"can not update this resource"
                });

            }
            const cat=resource.category;
            console.log(cat)
            cat.forEach(item => {
                Category.findById(item,(err,category)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Error occured choosing this category"
                        })
                    }
                    category.resourceCount+=1;
                    category.save((err)=>{
                        if(err){
                            return res.status(400).jsErroon({
                                error:"error occured saving in this category"
                            })
                        }
                    });
                })
                
            });
            res.json(resource);
        }
    )

}

exports.deleteResources = (req,res) =>{
    Resources.findById(req.params.id,(err,resource)=>{
        if(err){
            return res.status(400).json({
                error:"can not find this resource"
            });

        }
        
        resource.remove((err,resource)=>{
            if(err){
                return res.status(400).json({
                    error:"cannot delete this resource"
                })
            }
            const cat=resource.category;
            console.log(cat)
            cat.forEach(item => {
                Category.findById(item,(err,category)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Error occured finding this category"
                        })
                    }
                    category.resourceCount-=1;
                    category.save((err)=>{
                        if(err){
                            return res.status(400).jsErroon({
                                error:"error occured saving in this category"
                            })
                        }
                    });
                })
                
            });
            res.json({
                msg:"resource deleted successfully"
            })
        })

    })
}