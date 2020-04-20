const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const Tour = require('../models/tourModel');

const signupView = (req, res) => {
  res.status(200).render('sessions/signup');
};

const signinView = (req, res) => {
  res.status(200).render('sessions/signin');
};

const overviewView = (req, res) => {
  res.status(200).render('roots/overview');
};

const tourDetailsView = (req, res) => {
  res.status(200).render('tours/tourDetails', { slug: req.params.slug });
};

const forgotPasswordView = (req, res) => {
  res.status(200).render('sessions/forgotPassword');
}

exports.forgotPasswordView = forgotPasswordView;
exports.tourDetailsView = tourDetailsView;
exports.overviewView = overviewView;
exports.signupView = signupView;
exports.signinView = signinView;