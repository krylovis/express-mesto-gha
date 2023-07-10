const router = require('express').Router();
const { createUser, login } = require('../controllers/usersController');
const { createUserSchema, loginSchema } = require('../middlewares/joiSchemas');

router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);

module.exports = router;
