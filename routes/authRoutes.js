const router = require('express').Router();
const { createUser, login } = require('../controllers/usersController');
const { createUserSchema } = require('../middlewares/joiSchemas');

router.post('/signup', createUserSchema, createUser);
router.post('/signin', login);

module.exports = router;
