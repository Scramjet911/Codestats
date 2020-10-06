const express = require("express");
var router = express.Router();
const { check} = require('express-validator');


const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const { getDiscussion, getDiscussionById, getCommentById, createDiscussion, getAllDiscussion, deleteDiscussion, createComment, updateDiscussion, updateComment, deleteComment, getAllComments } =require("../controllers/discussion")
 
router.param("userId",getUserById);
router.param("discId",getDiscussionById);
router.param("commentId",getCommentById);

//discussion crud
router.post("/:userId",[ 
    check("title","Title must be filled").isLength({min:1}),
    check("body","Body must be filled").isLength({min:1}),
    check("category","Choose atleast one Category").notEmpty()
]
,isSignedIn,isAuthenticated,createDiscussion)
router.put("/:userId/:discId",isSignedIn,isAuthenticated,updateDiscussion)
router.get("/",getAllDiscussion);
router.get("/:discId",getDiscussion);
router.delete("/:userId/:discId",isSignedIn,isAuthenticated,deleteDiscussion)

//comment crud
router.post("/comment/:userId/:discId",isSignedIn,isAuthenticated,createComment)
router.put("/comment/:userId/:discId/:commentId",isSignedIn,isAuthenticated,updateComment)
router.delete("/comment/:userId/:discId/:commentId",isSignedIn,isAuthenticated,deleteComment)
router.get("/comment/:discId",getAllComments)

module.exports = router;
