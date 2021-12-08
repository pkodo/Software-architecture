const express = require('express');
const shopController = require('./../controllers/shop-controller');

const router = express.Router();

router
    .route('/')
    .post(shopController.createShop)
    .patch(shopController.editShop)
    .delete(shopController.deleteShop);

module.exports = router;