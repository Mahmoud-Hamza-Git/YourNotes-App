const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const NoteSchema = mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    userId: { type: String, ref: 'User', required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Note = mongoose.model('Notes', NoteSchema);
module.exports = Note;
