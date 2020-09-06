const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated} = require('../controllers/auth');
const {addSubscription, updateSubscription, deleteSubscription, getSubscription} = require('../controllers/subscibe');
const { getUserById } = require('../controllers/user');

router.param("userId",getUserById);
router.post('/:userId',isSignedIn, isAuthenticated, addSubscription);
router.put('/:userId',isSignedIn, isAuthenticated, updateSubscription);
router.delete('/:userId',isSignedIn, isAuthenticated, deleteSubscription);
// router.get('/get-subscription/:userId',isSignedIn,isAuthenticated,getSubscription);

module.exports = router;