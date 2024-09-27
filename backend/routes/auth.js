const express = require('express');
const router = express.Router();
const { loginAdmin, logoutAdmin, Me } = require('../controllers/authController');

// Route for admin login
router.post('/login', loginAdmin);
router.delete('/logout', logoutAdmin);
router.get('/getMe', Me);

module.exports = router;
