const express = require("express");
var router = express.Router();
const { check} = require('express-validator');


const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {createArticle,uploadImage,getArticleById,updateArticle,getAllArticle,savingArticle,like,unlike,createComment, deleteComment,getCommentById, updateComment, getAllcomment,deleteArticle, deletesavingArticle}= require("../controllers/article")

router.param("userId",getUserById);
router.param("articleId",getArticleById);
router.param("commentId",getCommentById);

// article routes
router.post("/article/create/:userId",[
    check("title","titile must be filled").isLength({min:1}),
    check("body","body must be filled").isLength({min:1}),
    check("category","choose any one category").notEmpty()
],isSignedIn,isAuthenticated,createArticle);

router.put("/article/update/:userId/:articleId",isSignedIn,isAuthenticated,updateArticle)
router.post("/:userId/uploadimage",isSignedIn,isAuthenticated,uploadImage);
router.delete("/article/delete/:userId/:articleId",isSignedIn,isAuthenticated,deleteArticle)
router.get("/article",getAllArticle);

//saving article route
router.post('/article/saving/:userId/:articleId',isSignedIn,isAuthenticated,savingArticle);
router.post('/article/deletesavingArticle/:userId/:articleId',isSignedIn,isAuthenticated,deletesavingArticle);


//liking article
router.post('/article/liking/:userId/:articleId',isSignedIn,like);
router.post('/article/unliking/:userId/:articleId',isSignedIn,unlike);
//comment route
router.post('/article/addcomment/:userId/:articleId',isSignedIn,isAuthenticated,createComment);
router.delete('/article/deletecomment/:userId/:articleId/:id',isSignedIn,isAuthenticated,deleteComment);
router.put('/article/updatecomment/:userId/:articleId/:commentId',isSignedIn,isAuthenticated,updateComment);
router.get('/article/getallcomment/:articleId',getAllcomment);







module.exports = router;
