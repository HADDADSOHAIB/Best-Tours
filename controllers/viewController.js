const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

const signupView = catchAsync((req, res, next) => {
  res.status(200).render('sessions/signup');
});

const signinView = catchAsync((req, res, next) => {
  res.status(200).render('sessions/signin');
});

exports.signupView = signupView;
exports.signinView = signinView;