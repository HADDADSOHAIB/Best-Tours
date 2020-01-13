const express=require('express');
const router=express.Router();

const tourController=require('../controllers/tourController');

router.param('id',tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour);

module.exports=router;