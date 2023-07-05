const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('../middlewares/errorHandling');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../routes/generateToken');
const cookieOptions = require('../utils/cookieOptions');

const register = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  const foundedUser = await User.findOne({ email });
  if (foundedUser) {
    return next(new AppError('This Email is already exists 🙄', 409));
  }

  let createdUser = await User.create({
    _id: uuidv4(),
    email,
    password,
  });
  delete createdUser._doc['password'];
  delete createdUser._doc['__v'];

  const token = generateToken(createdUser._id);

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({ status: 'success', data: createdUser });
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const foundedUser = await User.findOne({ email }, {}).select('-__v -role');

  if (!foundedUser) {
    return next(new AppError("This Email doesn't exist 🤷‍♂️", 404)); // don't forget return
  }
  const isMatched = await foundedUser.isPassMatched(password);
  if (!isMatched) {
    return next(new AppError('The Password you entered is not correct 🤷‍♂️', 401));
  }

  const token = generateToken(foundedUser._id);
  res.cookie('jwt', token, cookieOptions);

  foundedUser.password = undefined; // another way to remove password from fetched document
  res.status(200).json({ status: 'success', data: foundedUser });
});

module.exports = { register, signIn };
