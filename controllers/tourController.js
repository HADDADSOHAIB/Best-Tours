const fs=require('fs');
const Tour=require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory=require('./handlerFactory');
const AppError=require('./../utils/appError');

exports.aliasTopTours=async (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours=factory.getAll(Tour);
exports.getTour=factory.getOne(Tour,{path:'reviews'});
exports.createTour=factory.createOne(Tour);
exports.updateTour=factory.updateOne(Tour);
exports.deleteTour=factory.deleteOne(Tour);

exports.getTourStats=catchAsync(async (req,res,next)=>{
    const stats=await Tour.aggregate([
        { $match:{ratingsAverge:{$gte:4.5}}},
        {
            $group:{ 
                _id:'$difficulty',
                numTours:{ $sum:1},
                avgRating:{ $avg: '$ratingsAverge'},
                avgPrice: { $avg: '$price'},
                minPrice: { $min: '$price'},
                maxPrice: { $max: '$price'}
            }
        }
    ]);
    res.status(200).json({
        status:'success',
        data:{
            stats
        }
    });
});

exports.getMonthlyplan=catchAsync(async (req,res,next)=>{
    const year=req.params.year*1;
    const plan=await Tour.aggregate([
        { $unwind:'$startDates'},
        { $match:{ startDates:{ $gte:new Date(`${year}-01-01`), $lte:new Date(`${year}-12-31`)}}},
        {
            $group:{
                _id:{ $month: '$startDates'},
                numTourStarts:{ $sum:1},
                tours:{ $push: '$name' }
            }
        },
        { $addFields:{ month:'$_id' } },
        { $project:{_id: 0 }},
        { $sort:{ numTourStarts: -1 } }
    ]);
    
    res.status(200).json({
    status:'success',
        data:{
            plan
        }
    });
});
