const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

const signupView = catchAsync((req, res, next) => {
  res.status(200).render('sessions/signup');
  next();
});

exports.signupView = signupView;