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

router.route('/').get(getNotes).post(createNote);
router.post('/:id', updateNote);
router.post('/status/:id', changeStatus);
router.delete('/delete/:id', deleteNote);
router.delete('/delete-completed', deleteCompleted);

module.exports = router;
