const express=require('express');
const router=express.Router();

const tourController=require('../controllers/tourController');
const authController=require('../controllers/authController');
// router.param('id',tourController.checkId);
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
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect,tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect,authController.restrictTo("admin"),tourController.deleteTour);

module.exports=router;