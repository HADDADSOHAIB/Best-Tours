const fs=require('fs');
const Tour=require('./../models/tourModel');
const APIFeatures=require('./../utils/apiFeatures');

exports.aliasTopTours=async (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours=async (req,res)=>{
    try{
        const features=new APIFeatures(Tour.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const tours=await features.query;
        res.status(200).json({
            status:'succes',
            results:tours.length,
            data:{
                tours
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        }); 
    } 
}

exports.getTour=async (req,res)=>{
    try{
        const tour= await Tour.findById(req.params.id);
        res.status(200).json({
            status:'succes',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

exports.createTour=async (req,res)=>{
    try{
        const newTour=await Tour.create(req.body); 
        res.status(201).json({
            status:'succcess',
            data:{
                tour:newTour
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

exports.updateTour=async (req,res)=>{
    try{
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

exports.deleteTour=async (req,res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success'
        })
    } catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

exports.getTourStats=async (req,res)=>{
    try {
        const stats=await Tour.aggregate([
            {
                $match:{ratingsAverge:{$gte:4.5}}
            },
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
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}

exports.getMonthlyplan=async (req,res)=>{
    try {
        const year=req.params.year*1;
        const plan=await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{ 
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{ $month: '$startDates'},
                    numTourStarts:{ $sum:1},
                    tours:{ $push: '$name' }
                }
            },
            {
                $addFields:{ month:'$_id' }
            },
            {
                $project:{
                    _id: 0
                }
            },
            {
                $sort:{
                    numTourStarts: -1
                }
            }
        ]);
        res.status(200).json({
            status:'success',
            data:{
                plan
            }
        });
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
}
