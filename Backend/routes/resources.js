const express = require("express");
var router = express.Router();
const { check} = require('express-validator');


const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById}=require("../controllers/user")
const {createResources,deleteResources,updateResource,getAllResource,getResources} = require("../controllers/resources")


router.param("userId",getUserById)

//creating resource
router.post("/:userId",[
    check("description","description must be filled").isLength({min:1}),
    check("link","link must be filled").isLength({min:1}),
    check("category","choose any one category").notEmpty()
],isSignedIn,isAuthenticated,isAdmin,createResources);

//updating resource
router.put("/:userId/:id",isSignedIn,isAuthenticated,isAdmin,updateResource)
//deleting resource
router.delete("/:userId/:id",isSignedIn,isAuthenticated,isAdmin,deleteResources)
//geting the complete resource of a category
router.get("/:categoryId",getAllResource)
router.get("/",getResources)


//getting the category and count


module.exports =router;