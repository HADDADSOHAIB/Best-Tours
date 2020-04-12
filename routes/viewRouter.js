const express=require('express');
const router=express.Router();
const viewController = require('../controllers/viewController');

router.get('/signup', viewController.signupView);


module.exports = router;