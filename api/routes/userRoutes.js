const router = require('express').Router();
const { deleteAllUsers, updateUser } = require('../controllers/userControllers');
const protect = require('../middlewares/authMiddleware');

router.patch('/update-user', protect, updateUser);
router.delete('/delete-all', protect, deleteAllUsers);

module.exports = router;
