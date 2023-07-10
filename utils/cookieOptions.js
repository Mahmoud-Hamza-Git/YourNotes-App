const cookieOptions = {
  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
  secure: process.env.NODE_ENV === 'production' ? true : false, // will only be true if we are in production
  httpOnly: true,
};

module.exports = cookieOptions;
