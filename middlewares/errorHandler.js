const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,

  DEFAULT_ERROR,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ DEFAULT_ERROR });
  }
  next();
};

module.exports = errorHandler;
