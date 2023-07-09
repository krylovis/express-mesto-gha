const jwt = require('jsonwebtoken');

const {
  HTTP_STATUS_UNAUTHORIZED,
  NEEDED_AUTHORIZATION,
} = require('../utils/constants');

const handleAuthError = (res) => {
  res.status(HTTP_STATUS_UNAUTHORIZED).send({ message: NEEDED_AUTHORIZATION });
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) handleAuthError(res);

  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
