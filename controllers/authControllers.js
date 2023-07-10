const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('../middlewares/errorHandling');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../routes/generateToken');

const auth = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const foundedUser = await User.findOne({ email });
  if (foundedUser) {
    return next(new AppError('This Email is already exists 🙄', 400));
  }
  res.status(200).json({ status: 'success', data: '' });
});

//

const register = catchAsync(async (req, res, next) => {
  const { password, email, name, phone, birthYear } = req.body;

  if (!email || !password) {
    return next(new AppError('You have to provide an email and a password 🙄', 400));
  }

  let createdUser = await User.create({
    _id: uuidv4(),
    email,
    password,
    name,
    phone,
    birthYear,
  });
  delete createdUser._doc['password'];
  delete createdUser._doc['__v'];
  delete createdUser._doc['role'];

  const token = generateToken(createdUser._id);

  res.status(200).json({ status: 'success', data: createdUser, token });
});

//

const signIn = catchAsync(async (req, res, next) => {
  console.log('come🎉');
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
  foundedUser.password = undefined; // another way to remove password from fetched document
  res.status(200).send({ status: 'success', data: foundedUser, token });
});

//

module.exports = { auth, register, signIn };
