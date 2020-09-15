const express = require("express");
var router = express.Router();

const {getUserById, getUser, updateUser,photo, follow, unfollow, saveEvent, getSavedEvents, deleteSavedEvent} = require("../controllers/user");
const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const {queueNotification, getNotification, deleteNotification, updateNotification} = require("../controllers/notification");

router.param("userId",getUserById);
//user read routes
router.get("/:userId",isSignedIn,isAuthenticated,getUser);
router.get("/photo/:userId",photo);


//update route
router.put("/:userId",isSignedIn,isAuthenticated,updateUser);
// Follow, Unfollow other Users
router.post("/:userId/follow/:id",isSignedIn,isAuthenticated,follow);
router.post("/:userId/unfollow/:id",isSignedIn,isAuthenticated,unfollow);

// Save Events Routes
router.get("/event/:userId", isSignedIn, isAuthenticated, getSavedEvents);
router.post("/event/:userId", isSignedIn, isAuthenticated, queueNotification, saveEvent);
router.delete("/event/:userId", isSignedIn, isAuthenticated, deleteNotification, deleteSavedEvent)

//Event Notifications
router.get("/event/:userId/:eventId", isSignedIn, isAuthenticated, getNotification);
router.put("/notification/:userId", isSignedIn, isAuthenticated, updateNotification);

module.exports = router;