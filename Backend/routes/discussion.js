const express = require("express");
var router = express.Router();
const { check} = require('express-validator');


const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const { getDiscussionById, getCommentById, createDiscussion, getAllDiscussion, deleteDiscussion, createComment, updateDiscussion, updateComment, deleteComment, getAllComments } =require("../controllers/discussion")
 
router.param("userId",getUserById);
router.param("discId",getDiscussionById);
router.param("commentId",getCommentById);

//discussion crud
router.post("/discussion/create/:userId",[ 
    check("title","titile must be filled").isLength({min:1}),
    check("body","body must be filled").isLength({min:1}),
    check("category","choose any one category").notEmpty()
]
,isSignedIn,isAuthenticated,createDiscussion)
router.put("/discussion/update/:userId/:discId",isSignedIn,isAuthenticated,updateDiscussion)
router.get("/discussion",getAllDiscussion);
router.delete("/discussion/delete/:userId/:discId",isSignedIn,isAuthenticated,deleteDiscussion)

//comment crud
router.post("/discussion/createcomment/:userId/:discId",isSignedIn,isAuthenticated,createComment)
router.put("/discussion/updatecomment/:userId/:discId/:commentId",isSignedIn,isAuthenticated,updateComment)
router.delete("/discussion/deletecomment/:userId/:discId/:commentId",isSignedIn,isAuthenticated,deleteComment)
router.get("/discussion/comment/:discId",getAllComments)

module.exports = router;
