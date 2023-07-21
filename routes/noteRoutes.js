const {
  getNotes,
  createNote,
  updateNote,
  changeStatus,
  deleteNote,
  deleteCompleted,
} = require('../controllers/noteControllers');
const protect = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').post(protect, updateNote);
router.route('/status/:id').post(protect, changeStatus);
router.delete('/delete/:id', protect, deleteNote);
router.delete('/delete-completed', protect, deleteCompleted);

module.exports = router;
