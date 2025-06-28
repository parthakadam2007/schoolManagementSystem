const { validateTokenForAdmin } = require('../services/auth');

function checkForAuthenticationCookieOfAdmin(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      // Instead of throw, pass an error to next()
      res.status(401).json({error:"You need to be Admin to access this service."})
      return next(new Error("You need to be Admin to access this service."));
    }

    try {
      const userPayload = validateTokenForAdmin(tokenCookieValue);
      req.user = userPayload;
      return next();
    } catch (err) {
      return next(new Error("You need to be Admin to access this service."));
    }
  };
}

module.exports = { checkForAuthenticationCookieOfAdmin };
