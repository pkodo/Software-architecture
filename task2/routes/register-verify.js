const express = require('express');
const verifyController = require('./../controllers/register-verify-controller');

const router = express.Router();

router
    .route('/')
    .get(verifyController.verify);

module.exports = router;