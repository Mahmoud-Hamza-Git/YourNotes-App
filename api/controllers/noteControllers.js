const Note = require('../models/noteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middlewares/errorHandling');
const { v4: uuid4 } = require('uuid');

const createNote = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { text } = req.body;

  const createdNote = await Note.create({ _id: uuid4(), text, userId });

  res.status(200).json({ status: 'success', data: createdNote });
});

//

//

const updateNote = catchAsync(async (req, res, next) => {
  const noteId = req.params.id;
  const { text } = req.body;

  const updatedNote = await Note.findByIdAndUpdate(noteId, { text }, { new: true });

  res.status(200).json({ status: 'success', data: updatedNote });
});

//

//

const getNotes = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { filter } = req.query;
  let activeFilter;
  if (filter === 'active') {
    activeFilter = { active: true };
  } else if (filter === 'completed') {
    activeFilter = { active: false };
  } else {
    activeFilter = { $or: [{ active: true }, { active: false }] };
  }
  const notes = await Note.find({ $and: [{ userId }, activeFilter] }).sort('-createdAt');

  res.status(200).json({ status: 'success', data: notes });
});

//

//

const changeStatus = catchAsync(async (req, res, next) => {
  const noteId = req.params.id;
  let { active } = req.query;
  if (!active) {
    return next(new AppError('you need to add the targeted note status in the request', 500));
  }

  active = active === '1' ? true : false;

  const noteChanged = await Note.findByIdAndUpdate(noteId, { active }, { new: true });

  res.status(200).json({ status: 'success', data: noteChanged });
});

//

//

const deleteNote = catchAsync(async (req, res, next) => {
  const noteId = req.params.id;

  const deletedNote = await Note.findByIdAndDelete(noteId);

  res.status(200).json({ status: 'success', data: 'The note is deleted' });
});

//

//

const deleteCompleted = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const ack = await Note.deleteMany({ $and: [{ userId }, { active: false }] });

  res.status(200).json({ status: 'success', data: ack });
});

//

module.exports = { createNote, updateNote, getNotes, changeStatus, deleteNote, deleteCompleted };
