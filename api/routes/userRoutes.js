const router = require('express').Router();
const { deleteAllUsers, updateUser } = require('../controllers/userControllers');
const protect = require('../middlewares/authMiddleware');

router.post('/update-user', updateUser);
router.delete('/delete-all', deleteAllUsers);

module.exports = router;
