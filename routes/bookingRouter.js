const express=require('express');
const router=express.Router({mergeParams:true});
const bookingController=require('./../controllers/bookingController');
const authController=require('./../controllers/authController');

router.use( authController.protect );
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession );
router.get('/my-tours', bookingController.getMyTours );

module.exports = router;
