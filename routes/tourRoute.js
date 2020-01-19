const express=require('express');
const router=express.Router();

const tourController=require('../controllers/tourController');
const authController=require('../controllers/authController');
const reviewRouter=require('./reviewRoute');

router.use('/:tourId/reviews',reviewRouter);
router
    .route('/tour-stats')
    .get(tourController.getTourStats); 
router
    .route('/monthly-plan/:year')
    .get(tourController.getMonthlyplan); 
router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours,tourController.getAllTours);
router
    .route('/tours-within/:distance/lat/:lat/lng/:lng/unit/:unit')
    .get(tourController.getToursWithin);
router
    .route('/distances/lat/:lat/lng/:lng/unit/:unit')
    .get(tourController.getDistances);
router
    .route('/')
    .get(tourController.getAllTours)
    .post(
        authController.protect,
        authController.restrictTo('admin','lead-guide'),
        tourController.createTour
    );

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(
        authController.protect,
        authController.restrictTo('admin','lead-guide'),
        tourController.updateTour
    ).delete(
        authController.protect,
        authController.restrictTo("admin"),
        tourController.deleteTour
    );
    
module.exports=router;