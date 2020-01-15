const fs=require('fs');
const Tour=require('./../models/tourModel');
exports.aliasTopTours=async (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
}

class APIFeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        let queryObj={...this.queryString};
        const excludedFields=['page','sort','limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]);
        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        queryObj=JSON.parse(queryStr);
        this.query=this.query.find(queryObj);
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ');
            this.query=this.query.sort(sortBy);
        }
        else{
            this.query=this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            query=query.select(fields);
        }
        else{
            this.query=this.query.select('-__v'); 
        }
        return this;
    }

    paginate(){
        const page=this.queryString.page*1 || 1;
        const limit=this.queryString.limit*1 || 100;
        const skip=limit*(page-1);
        this.query=this.query.skip(skip).limit(limit);
        return this;
    }
}

exports.getAllTours=async (req,res)=>{
    try{
        const features=new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
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
