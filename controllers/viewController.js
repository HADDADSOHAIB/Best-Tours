
exports.signupView = (req, res) => {
  res.status(200).render('sessions/signup');
};

exports.signinView = (req, res) => {
  res.status(200).render('sessions/signin');
};

exports.overviewView = (req, res) => {
  res.status(200).render('roots/overview');
};

exports.tourDetailsView = (req, res) => {
  res.status(200).render('tours/tourDetails', { slug: req.params.slug });
};

exports.forgotPasswordView = (req, res) => {
  res.status(200).render('sessions/forgotPassword');
}

exports.resetPasswordView = (req, res) => {
  res.status(200).render('sessions/resetPassword',{
    token: req.params.token
  });
}

exports.meView = (req, res) => {
  res.status(200).render('users/me');
}
