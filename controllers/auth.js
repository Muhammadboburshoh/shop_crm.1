const User = require('../models/users');
const { sign } = require('../utils/jwt');

exports.getLogin = async (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Page'
  });
};

exports.postLogin = async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  const user = await User.findOne(login, password);

  if (user) {
    const accessToken = sign(user);
    res.cookie(
      '__auth',
      { access_token: accessToken, user },
      { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
    );
    res.redirect('/');
  } else {
    res.status(401);
    res.redirect('/login');
  }
};

exports.abs = (req, res) => {
  res.render('auth/login', { pageTitle: '' });
};
