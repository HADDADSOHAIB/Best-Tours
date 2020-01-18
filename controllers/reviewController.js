catchAsync=require('./../utils/catchAsync');
Review=require('./../models/revieModel');
Tour=require('./../models/tourModel');
AppError=require('./../utils/appError')

exports.getReviewsOfTour=catchAsync(async (req,res,next)=>{
    const tourId=req.params.tourId;
    const tour=await Tour.findById(tourId);
    if(!tour) next(new AppError('There is no tour with the provided Id',400));
    const reviews= await Review.find({tour:tourId}).select('-__v');
    res.status(200).json({
        status:'success',
        data:{
            reviews
        }
    });
});

exports.getAllReviews=catchAsync(async (req,res,next)=>{
    
    const reviews= await Review.find().select('-__v');
    res.status(200).json({
        status:'success',
        data:{
            reviews
        }
    });
});

exports.createReview=catchAsync(async (req,res, next)=>{
    const newReview= await Review.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            review:newReview
        }
    });
});
