const express = require('express');

const auth = require('../middlewares/auth');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('', usersController.createUser);
router.post('/login', usersController.login);
router.delete('/logout', auth, usersController.logout);
router.get('/me', auth, usersController.getMe);

module.exports = router;
