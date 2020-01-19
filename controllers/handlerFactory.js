const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

exports.deleteOne=Model=>catchAsync(async (req,res)=>{
    let doc=await Model.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError('No tour found with that id',404));
    }
    res.status(204).json({
        status:'success'
    });
});




