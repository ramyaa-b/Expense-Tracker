const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserInfo} = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
// router.get('/getUser',protect, getUserInfo);
module.exports = router;
