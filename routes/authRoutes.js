const { signIn, register, auth } = require('../controllers/authControllers');
const router = require('express').Router();

router.post('/', auth);
router.post('/register', register);
router.post('/sign', signIn);

module.exports = router;
