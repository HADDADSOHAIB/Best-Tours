const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync');
const jwt=require('jsonwebtoken');
const AppError=require('./../utils/appError');

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}

exports.signup=catchAsync(async (req,res,next)=>{
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        photo:req.body.photo,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    });

    const token=signToken(newUser._id);

    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });
});

exports.login=catchAsync(async (req,res, next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password',400));
    }

    const user=await User.findOne({email}).select('+password');
    if(!user ||  !user.correctPassword(password,user.password)){
        return next(new AppError('Incorrect email or password',401));
    }

    const token=signToken(user._id);

    res.status(200).json({
        status:'success',
        token
    })
});

exports.protect=catchAsync(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('You are not logged in',401));
    }

    

     
    next();
});