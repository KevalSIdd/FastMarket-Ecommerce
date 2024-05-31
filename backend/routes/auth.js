const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register_user);

router.post('/login', authController.login_user);

router.post('/forgotPassword', authController.forgotPassword);

router.post('/createPassword', authController.createPassword);

module.exports = router;
