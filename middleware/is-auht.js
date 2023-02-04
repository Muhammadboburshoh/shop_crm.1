const { verify } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  if (!req.cookies.__auth) {
    return res.redirect('/login');
  } else {
    const { access_token } = req.cookies.__auth;
    if (!access_token) {
      return res.redirect('/login');
    }

    try {
      const user = await verify(access_token);
      if (!user) {
        return res.redirect('/login');
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      return res.redirect('/login');
    }
  }
};
