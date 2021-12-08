const express = require('express');
const filterController = require('./../controllers/filter-controller');

const router = express.Router();

router
    .route('/')
    .get(filterController.getAllShops);

module.exports = router;