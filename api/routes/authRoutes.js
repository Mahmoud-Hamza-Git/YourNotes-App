const { signIn, register } = require('../controllers/authControllers');
const router = require('express').Router();

router.post('/register', register);
router.post('/sign', signIn);

module.exports = router;
