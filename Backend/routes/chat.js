const express = require("express");
const router = express.Router();

const { isSignedIn } = require("../controllers/auth");
const { getChatrooms, getChat, checkUser, createChatroom, deleteChatroom } = require("../controllers/chat");

// Get all chats of User
router.get("/:username",isSignedIn, checkUser, getChatrooms);
// Get Specific Chat of User
router.get("/:username/:chatroomId/:date?",isSignedIn, checkUser, getChat);
// Start a Chat with User
router.post("/:username", isSignedIn, checkUser, createChatroom);
// Delete Chat with User
router.delete("/:username", isSignedIn, checkUser, deleteChatroom);

module.exports = router;