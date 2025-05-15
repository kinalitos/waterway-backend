const { Router } = require('express');
const router = Router();
const {
  signupUser,
  loginUser
} = require('../controller/auth');

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;