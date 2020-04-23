const express=require('express');
const router=express.Router({mergeParams:true});
const reviewController=require('./../controllers/reviewController');
const authController=require('./../controllers/authController');

router.route('/:tourId')
    .get(reviewController.getReviewsOfTour);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview
    );
router.route('/:id')
    .delete(reviewController.deleteReview)
    .patch(reviewController.updateReview)
    .get(reviewController.getReview);
module.exports=router;