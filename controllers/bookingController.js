const Tour=require('./../models/tourModel');
const Booking=require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory=require('./handlerFactory');
const AppError=require('./../utils/appError');
const Email=require('./../utils/email');
const stripe = require('stripe')('sk_test_hE2iOItUacnaA3fEOI3ip9zp00gjGoK4w0');

exports.getCheckoutSession = catchAsync( async(req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&&user=${JSON.stringify(req.user)}&&price=${tour.price}&&tourName=${tour.name}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createBookingCheckout  = (req, res, next) => {
  const { tour, user, price, tourName } = req.query;
 
  if(!tour || !user || !price){
    next();
  }
  else{
    Booking.create({tour, user, price }, function (err, response) {
      if (err){
        new AppError("Booking Error", 400);
      }
      
      let email = new Email(JSON.parse(user),`${req.protocol}://${req.get('host')}/my-tours`,{ tourName });
      email.sendTourBooked();
    });
    res.redirect(301,`${req.protocol}://${req.get('host')}/tour-booked/${tour}`);
  }
};
