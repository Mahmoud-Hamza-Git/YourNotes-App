const { AppError } = require('../middlewares/errorHandling');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const hashPassword = require('../utils/hashPassword');

const updateUser = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (email) {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(new AppError('This Email is already Exists 🤷‍♂️', 400));
    }
  }

  if (password) {
    req.body.password = await hashPassword(password);
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select(
    '-password -__v -role'
  );

  res.status(200).json({ status: 'success', data: updatedUser });
});

const deleteAllUsers = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('Not Authorized, Admin access needed ✋'));
  }
  const ack = await User.deleteMany({ role: 'user' });
  res.status(200).json({ status: 'success', data: ack });
});

module.exports = { deleteAllUsers, updateUser };
