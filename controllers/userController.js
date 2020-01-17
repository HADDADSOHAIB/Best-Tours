const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const filterOnj=require('./../utils/filterObj');
exports.getAllUsers=async (req,res)=>{
    const users=await User.find();
    res.status(200).json({
        status:'succes',
        results:users.length,
        data:{
            users
        }
    });
    
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.getUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.updateUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.createUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.deleteUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.updateMe=catchAsync(async (req, res, next)=>{
    if(req.body.password || req.body.confirmPassword){
        return next(new AppError('This route is not for password update',400));
    }

    const filteredBody=filterObj(req.body,'name','email');

    const updatedUser= await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {new:true, runValidators:true})
    user.name=req.body.name;
    await user.save();

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    });
});
