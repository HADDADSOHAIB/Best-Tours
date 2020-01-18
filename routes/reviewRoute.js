const express=require('express');
const router=express.Router();
const reviewController=require('./../controllers/reviewController');
const authController=require('./../controllers/authController');

router.route('/:tourId')
    .get(reviewController.getReviewsOfTour);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect,authController.restrictTo('user'),reviewController.createReview);

module.exports=router;