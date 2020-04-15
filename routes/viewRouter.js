const express=require('express');
const router=express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/signup', viewController.signupView);
router.get('/signin', viewController.signinView);
router.get('/', viewController.overviewView);

module.exports = router;