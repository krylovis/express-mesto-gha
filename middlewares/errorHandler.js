const { DEFAULT_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || DEFAULT_ERROR });
  }
  next();
};

module.exports = errorHandler;
