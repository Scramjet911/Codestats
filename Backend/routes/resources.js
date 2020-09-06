const express = require("express");
var router = express.Router();
const { check} = require('express-validator');


const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById}=require("../controllers/user")
const {getResourceById,createResources,deleteResources,updateResource,getAllResource,getResources} = require("../controllers/resources")


router.param("userId",getUserById)

//creating resource
router.post("/resource/create/:userId",[
    check("description","description must be filled").isLength({min:1}),
    check("link","link must be filled").isLength({min:1}),
    check("category","choose any one category").notEmpty()
],isSignedIn,isAuthenticated,isAdmin,createResources);

//updating resource
router.put("/resource/update/:userId/:id",isSignedIn,isAuthenticated,isAdmin,updateResource)
//deleting resource
router.delete("/resource/delete/:userId/:id",isSignedIn,isAuthenticated,isAdmin,deleteResources)
//geting the complete resource of a category
router.get("/resources/:categoryId",getAllResource)
router.get("/resources",getResources)


//getting the category and count


module.exports =router;