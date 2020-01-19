const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const APIFeatures=require('./../utils/apiFeatures');

exports.deleteOne=Model=>catchAsync(async (req,res)=>{
    let doc=await Model.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError('No tour found with that id',404));
    }
    res.status(204).json({
        status:'success'
    });
});

exports.updateOne=Model=>catchAsync(async (req,res,next)=>{
    const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        status:'success',
        data:{
            data: doc
        }
    });
});

exports.createOne=Model=>catchAsync(async (req,res,next)=>{
    const newDoc=await Model.create(req.body); 
    res.status(201).json({
        status:'success',
        data:{
            data:newDoc
        }
    });
});

exports.getOne=(Model,popOptions)=>catchAsync(async (req,res,next)=>{
    let query=Model.findById(req.params.id);
    if(popOptions) query=query.populate('reviews');
    const doc= await query;
    if(!doc){
        return next(new AppError('No doc found with that id',404));
    }
    res.status(200).json({
        status:'succes',
        data:{
            data:doc
        }
    });
});

exports.getAll=Model=>catchAsync(async (req,res,next)=>{
    let filter={};
    if(req.params.tourId) filter={tour: req.params.tourId};

    const features=new APIFeatures(Model.find(filter),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const docs=await features.query;
    res.status(200).json({
        status:'succes',
        results:docs.length,
        data:{
            data:docs
        }
    });
});
