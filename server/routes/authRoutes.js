const express = require('express'); 
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController'); // ← FIXED SPELLING
const router  = express.Router(); 
const { protect } = require('../middlewares/authMiddleware');

// ! Auth Routes 
router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); 
router.put('/profile', protect, updateUserProfile); // ← Now receives actual function

module.exports = router;