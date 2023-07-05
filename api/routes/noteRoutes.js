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
router.patch('/:id', updateNote);
router.patch('/status/:id', changeStatus);
router.delete('/delete/:id', deleteNote);
router.delete('/delete-completed', protect, deleteCompleted);

module.exports = router;
