
const express = require('express'); 
const router  = express.Router(); 


// ! Auth Routes 
router.post("/register",registerUser);   // Register User
// router.post('/login', loginUser);    Login User
router.get('/profile', protect, getUsrProfile);  // Get User Profile 
router.put('/profile', protect, updateUserProfile);  // Update Profle 


module.exports=router; 