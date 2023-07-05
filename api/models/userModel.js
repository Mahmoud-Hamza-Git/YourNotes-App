const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/hashPassword');

const UserSchema = mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String, required: [true, 'Sorry, you need to pass the user Email 👉👈'] },
    password: {
      type: String,
      selcect: false,
      required: [true, 'Sorry, you need to pass the user Password 👉👈'],
    },
    name: { type: String, default: 'New User' },
    phone: { type: String, default: 'xxx-xxx-xxx' },
    birthYear: { type: Number, default: 2000 },
    role: { type: String, default: 'user', immutable: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  // check if password changed form the last save, and if changed will hash it then save
  if (!this.isModified('password')) {
    next();
  }
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.methods.isPassMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('Users', UserSchema);
module.exports = User;
