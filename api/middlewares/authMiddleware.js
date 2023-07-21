const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('./errorHandling');
const User = require('../models/userModel');

const protect = catchAsync(async (req, res, next) => {
  // const token = req.headers.authorization?.split(' ')[1];  2 ways to get parameters in header, 1 from headers object and the other using header method provided by express &*()
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return next(new AppError('Not Authorized, there is no JWT Token', 401));
  }
  console.log('Authentication called✅');
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
