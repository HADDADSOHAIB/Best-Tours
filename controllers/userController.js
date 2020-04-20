const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const filterObj=require('./../utils/filterObj');
const factory=require('./handlerFactory');
const multer=require('multer');
const sharp=require('sharp');

// const multerStorage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/img/users');
//     },
//     filename:(req,file,cb)=>{
//        const ext=file.mimetype.split('/')[1];
//        cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });
const multerStorage=multer.memoryStorage();
const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(new AppError('This is not an image, please upload only images',400));
    }
}
const upload=multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadUserPhoto=upload.single('photo');
exports.resizeUserPhoto=catchAsync(async(req,res,next)=>{
    
    if(!req.file) return next();
    req.file.filename=`user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/users/${req.file.filename}`);
    next();
});
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

    const filteredBody=filterObj(req.body,'name','photo');
    if(req.file) filteredBody.photo=req.file.filename;

    const updatedUser= await User.findByIdAndUpdate(req.user.id, filteredBody, {new:true, runValidators:true});
    
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
