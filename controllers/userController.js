const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const filterObj=require('./../utils/filterObj');
const factory=require('./handlerFactory');

exports.getAllUsers=factory.getAll(User);
exports.getUser=factory.getOne(User);
exports.updateUser=factory.updateOne(User);
exports.deleteUser=factory.deleteOne(User);

exports.getMe=(req,res,next)=>{
    req.params.id=req.user.id;
    next();
}

exports.updateMe=catchAsync(async (req, res, next)=>{
    if(req.body.password || req.body.confirmPassword){
        return next(new AppError('This route is not for password update',400));
    }

    const filteredBody=filterObj(req.body,'name','email','photo');
    const updatedUser= await User.findByIdAndUpdate(req.user.id,filteredBody,{new:true, runValidators:true});

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    });
});

exports.deleteMe=catchAsync(async (req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false});
    res.status(204).json({
        status:'success',
        data:null
    });
});
