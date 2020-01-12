const express=require('express');
const app=express();
const morgan=require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const tourRouter=require('./routes/tourRoute');
const userRouter=require('./routes/userRoute');

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports=app;