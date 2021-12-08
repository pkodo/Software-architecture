const express = require('express');
const poiController = require('./../controllers/poi-controller');

const router = express.Router();

router
    .route('/')
    .post(poiController.createPoi)
    .patch(poiController.editPoi)
    .delete(poiController.deletePoi);

module.exports = router;