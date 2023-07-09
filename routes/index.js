const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND, PAGE_NOT_FOUND } = require('../utils/constants');

const { createUser, login } = require('../controllers/usersController');
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: PAGE_NOT_FOUND }));

module.exports = router;
