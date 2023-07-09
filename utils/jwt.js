const jwt = require('jsonwebtoken');

const JWT_SECRET = 'super-strong-secret';
module.exports.generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
