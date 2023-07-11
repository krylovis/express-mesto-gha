const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../custom-errors/UnauthorizedError');

const { NEEDED_AUTHORIZATION } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new UnauthorizedError(NEEDED_AUTHORIZATION);

  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError(NEEDED_AUTHORIZATION);
  }

  req.user = payload;

  next();
};
