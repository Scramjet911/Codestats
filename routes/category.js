const express = require("express");
var router = express.Router();

const {getCategoryById,createCategory,upadateCategory,removeCategory,getCategory,getAllCategory} = require("../controllers/category")
const {isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);


router.post("/category/create/:userId",
isSignedIn,
isAuthenticated, 
createCategory
);

router.get("/category/:categoryId",getCategory);    
router.get("/category/",getAllCategory);

router.put("/category/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
upadateCategory
);

router.delete("/category/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCategory
);

module.exports = router;