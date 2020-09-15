const express = require("express");
var router = express.Router();

const {getCategoryById,createCategory,upadateCategory,removeCategory,getCategory,getAllCategory} = require("../controllers/category")
const {isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);


router.post("/create/:userId",
isSignedIn,
isAuthenticated, 
createCategory
);

router.get("/:categoryId",getCategory);    
router.get("/",getAllCategory);

router.put("/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
upadateCategory
);

router.delete("/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCategory
);

module.exports = router;