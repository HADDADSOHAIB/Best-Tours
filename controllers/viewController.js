const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const Tour = require('../models/tourModel');

const signupView = catchAsync((req, res, next) => {
  res.status(200).render('sessions/signup');
});

const signinView = catchAsync((req, res, next) => {
  res.status(200).render('sessions/signin');
});

const overviewView = catchAsync((req, res, next) => {
  res.status(200).render('roots/overview');
});

const tourDetailsView = catchAsync( async(req, res, next) => {
  res.status(200).render('tours/tourDetails', { slug: req.params.slug });
});

exports.tourDetailsView = tourDetailsView;
exports.overviewView = overviewView;
exports.signupView = signupView;
exports.signinView = signinView;