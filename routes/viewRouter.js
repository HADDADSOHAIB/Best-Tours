const express=require('express');
const router=express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

router.use(authController.isLoggedIn);

router.get('/tour/:slug', viewController.tourDetailsView);
router.get('/signup', viewController.signupView);
router.get('/signin', viewController.signinView);
router.get('/my-tours', viewController.myTourView);
router.get('/forgot-password', viewController.forgotPasswordView);
router.get('/reset-password/:token', viewController.resetPasswordView);
router.get('/tour-booked/:tourId', viewController.tourBookedView);
router.get('/me', viewController.meView);

router.get('/', 
  bookingController.createBookingCheckout, 
  viewController.overviewView
);

module.exports = router;