const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// MIDDLEWARES
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.get('/isauth', auth(), authController.isauth);
// router.post('/testrole', auth('createAny', 'test'), authController.testrole);

module.exports = router;
