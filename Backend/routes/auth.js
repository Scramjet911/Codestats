const express = require("express");
var router = express.Router();
const { check ,validationResult, oneOf} = require('express-validator');
const{signout,signup,signin,isSignedIn,confirmationPost,forgotpassword, createPassword}=require('../controllers/auth');

router.post("/signup",[
    check("username","username should be 3 characters")
    .isLength({min:3}),
    check("name","name is required")
    .isLength({ min: 1 }),
    check("email","email is required")
    .isEmail(),
    check("password","password should be 4 characters")
    .isLength({ min: 4 }),
    check("occupation","occupation is required")
    .isIn(['student','professional','other']),
    check("institution","institution is required")
    .isLength({min:1})
    //check("prog_lang","programming language required").isLength({min:1}),
    
],
signup 
);
router.post("/confirmation/:token",confirmationPost)
router.post("/signin",[
    check("email","email is required")
    .isEmail(),
    check("password","password is required")
    .isLength({ min: 1 }),
]
,signin);
router.get("/signout",signout);
router.post("/forgotpassword",
[
    check("email","email is required")
    .isEmail(),
],
forgotpassword);
router.post("/createpassword/:token",createPassword)



module.exports=router;