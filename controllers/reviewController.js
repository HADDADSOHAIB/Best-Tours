catchAsync=require('./../utils/catchAsync');
Review=require('./../models/revieModel');
Tour=require('./../models/tourModel');
AppError=require('./../utils/appError')
const factory=require('./handlerFactory');

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

exports.setTourUserIds=(req,res,next)=>{
    if(!req.body.tour) req.body.tour=req.params.tourId;
    if(!req.body.user) req.body.user=req.user.id;
    next();
}
exports.getAllReviews=factory.getAll(Review);
exports.createReview=factory.createOne(Review);
exports.deleteReview=factory.deleteOne(Review);
exports.updateReview=factory.updateOne(Review);
exports.getReview=factory.getOne(Review);