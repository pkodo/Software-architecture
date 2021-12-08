const express = require('express');
const resetPassword = require('./../controllers/reset-password-controller');

const router = express.Router();

router
    .route('/')
    .post(resetPassword.sendLink);

router
    .route('/verify')
    .post(resetPassword.verifyResetPassword);
router
    .route('/reset')
    .post(resetPassword.resetPassword);

module.exports = router;