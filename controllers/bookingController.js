const Tour=require('./../models/tourModel');
const Booking=require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory=require('./handlerFactory');
const AppError=require('./../utils/appError');
const stripe = require('stripe')('sk_test_hE2iOItUacnaA3fEOI3ip9zp00gjGoK4w0');

exports.getCheckoutSession = catchAsync( async(req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  console.log(req.protocol);
  console.log(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&&user=${req.user.id}&&price=${tour.price}`,
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

exports.createBookingCheckout  = catchAsync( async(req, res, next) => {
  const { tour, user, price } = req.query;
  if(!tour || !user || !price) next();
  await Booking.create({ tour, user, price });
  res.redirect(`${req.protocol}://${req.get('host')}/`);
});
