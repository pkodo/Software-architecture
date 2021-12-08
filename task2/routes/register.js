const express = require('express');
const registerController = require('./../controllers/register-controller');

const router = express.Router();

router
    .route('/')
    .post(registerController.registerUser);

module.exports = router;