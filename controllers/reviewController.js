catchAsync=require('./../utils/catchAsync');
Review=require('./../models/revieModel');
Tour=require('./../models/tourModel');
AppError=require('./../utils/appError')
const factory=require('./handlerFactory');

// exports.getReviewsOfTour=catchAsync(async (req,res,next)=>{
//     const tourId=req.params.tourId;
//     const tour=await Tour.findById(tourId);
//     if(!tour) next(new AppError('There is no tour with the provided Id',400));
//     const reviews= await Review.find({tour:tourId}).select('-__v');
//     res.status(200).json({
//         status:'success',
//         data:{
//             reviews
//         }
//     });
// });

exports.getAllReviews=catchAsync(async (req,res,next)=>{
    let filter={};
    if(req.params.tourId) filter={tour: req.params.tourId};
    const reviews= await Review.find(filter).select('-__v');
    res.status(200).json({
        status:'success',
        data:{
            reviews
        }
    });
});

exports.createReview=catchAsync(async (req,res, next)=>{
    if(!req.body.tour) req.body.tour=req.params.tourId;
    if(!req.body.user) req.body.user=req.user.id;
    
    const newReview= await Review.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            review:newReview
        }
    });
});

exports.deleteReview=factory.deleteOne(Review);