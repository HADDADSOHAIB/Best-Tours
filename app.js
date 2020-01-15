const express=require('express');
const app=express();
const morgan=require('morgan');
const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const tourRouter=require('./routes/tourRoute');
const userRouter=require('./routes/userRoute');

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

app.all('*',(req,res,next)=>{ 
    next(new AppError(`can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);  

module.exports=app;