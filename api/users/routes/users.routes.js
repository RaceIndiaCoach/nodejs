const express = require('express');
const router = express.Router();
const signUpSignInController = require('../controllers/signUp_signIn.controllers');

router.post('/register', signUpSignInController.register);
router.post('/login', signUpSignInController.login);
router.post('/forgot/password/send/OTP', signUpSignInController.forgotPasswordSendOTP);
router.post('/OTP/match', signUpSignInController.OTPmatch);
router.post('/forgot/password/update', signUpSignInController.forgotPasswordUpdate);

module.exports = router;