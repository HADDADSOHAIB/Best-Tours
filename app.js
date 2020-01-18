const express=require('express');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const app=express();
const morgan=require('morgan');
const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(helmet());
app.use(express.json({ limit:'10kb'}));
app.use(express.static(`${__dirname}/public`));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
    whitelist:['duration']
}));

const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many request from this ip, try again in 1h'
});
app.use('/api',limiter);

const tourRouter=require('./routes/tourRoute');
const userRouter=require('./routes/userRoute');
const reviewRouter=require('./routes/reviewRoute');

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);

app.all('*',(req,res,next)=>{ 
    next(new AppError(`can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);  

module.exports=app;