const express = require('express');
const favouritesController = require('./../controllers/favourite-controller');

const router = express.Router();

router
    .route('/')
    .post(favouritesController.createFavourite)
    .patch(favouritesController.editFavourite)
    .delete(favouritesController.deleteFavourite);

module.exports = router;