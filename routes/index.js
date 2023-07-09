const router = require('express').Router();

const { HTTP_STATUS_NOT_FOUND, PAGE_NOT_FOUND } = require('../utils/constants');
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const authRoutes = require('./authRoutes');

router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: PAGE_NOT_FOUND }));

module.exports = router;
