const fs=require('fs');
const Tour=require('./../models/tourModel');

exports.getAllTours=async (req,res)=>{
    try{
    const tours=await Tour.find();
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
        })
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

