const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { validate } = require('../middleware/validateMiddleware');
const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;
