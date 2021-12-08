const express = require('express');
const viewsController = require('../controllers/views-controller');
const loginController = require('../controllers/login-controller');

const router = express.Router();

router.use(loginController.isLoggedIn);

module.exports = router;

router.get('/', viewsController.getOverview); 
router.get('/favourite', viewsController.getFavourites);
router.get('/poi', viewsController.getPoi);
router.get('/shop', viewsController.getShops);
router.get('/signup', viewsController.signup);
router.get('/login', viewsController.login);


