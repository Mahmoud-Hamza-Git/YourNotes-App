const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('./errorHandling');
const User = require('../models/userModel');

const protect = catchAsync(async (req, res, next) => {
  // console.log(req.cookies.jwt, '✅');
  // if (!req.cookies.jwt) {
  //   return next(new AppError('Not Authorized, there is no JWT Token', 500));
  // }

  const token = req.headers.authorization?.split(' ')[1];
  console.log(token, '✅');
  if (!token) {
    return next(new AppError('Not Authorized, there is no JWT Token', 500));
  }
  res.set('Authorization', `Bearer ${token}`);
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      console.log('JWT Error👉', error);
      return next(new AppError('Invaild Token 😕', 500));
    }
    req.user = await User.findById(decoded.id).select('-password -__v');
    next();
  });
});

module.exports = protect;
