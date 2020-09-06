const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {addEvent, approveEvent, addReviewEvent, deleteEvent, updateReviewEvent, deleteReviewEvent, updateEvent, getEvent} = require('../controllers/events');
const { isAdmin, isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

const eventValidate = ()=>{
    return [
        check("userId","User Id is required").exists(),
        check("title","Title is required").exists(),
        check("location","Location is required").exists(),
        check("date","Date is required").exists(),
        check("duration","Duration is required").exists()
    ]
}

router.param("userId",getUserById);
// Get the months Main Events
router.get('/events/',getEvent);
// Get review Events submitted by user
router.get('/review-event/:userId', isSignedIn, isAuthenticated, )
// Add Events for non admin users
router.post('/review-event/:userId', eventValidate(), isSignedIn, isAuthenticated, addReviewEvent);
// Update Review Events
router.put('/review-event/:userId', isSignedIn, isAuthenticated, updateReviewEvent);
// Delete Review Events
router.delete('/review-event/:userId', isSignedIn, isAuthenticated, deleteReviewEvent);

// Approve Review - Events added by non admin users
router.post('/auth-event/:userId',isSignedIn, isAuthenticated, isAdmin, approveEvent);
// Add Events for admin users
router.post('/event/:userId', eventValidate(), isSignedIn,isAuthenticated, isAdmin, addEvent);
// Update Events
router.put('/event/:userId', isSignedIn,isAuthenticated, isAdmin, updateEvent);
// Delete Events, only admins
router.delete('/event/:userId',isSignedIn, isAuthenticated, isAdmin, deleteEvent);

module.exports = router;