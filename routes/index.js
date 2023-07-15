const router = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { corsSettings } = require('../middlewares/corsSettings');
const NotFoundError = require('../custom-errors/NotFoundError');

const { PAGE_NOT_FOUND } = require('../utils/constants');
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const authRoutes = require('./authRoutes');

router.use(requestLogger);

router.use(corsSettings);
router.use(cookieParser());
router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use(errorLogger);
router.use(errors());
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
