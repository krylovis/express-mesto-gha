const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND } = require('../utils/constants');

const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res) => res.status(404).send({ message: HTTP_STATUS_NOT_FOUND }));

module.exports = router;
