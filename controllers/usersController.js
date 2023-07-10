const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const User = require('../models/user');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,

  INVALID_USER_DATA,
  USER_NONEXISTENT,
  USER_ALREADY_EXISTS,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_USER_DATA });
  }

  return User.findOne({ email })
    .then((findUser) => {
      if (findUser) return res.status(HTTP_STATUS_CONFLICT).send({ message: USER_ALREADY_EXISTS });

      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(HTTP_STATUS_CREATED).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }));
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: USER_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user.id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_USER_DATA });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_UNAUTHORIZED).send({ message: WRONG_EMAIL_OR_PASSWORD });
      }
      const token = generateToken(user.id);
      res.cookie('jwt', token, {
        httpOnly: true, sameSite: true,
      });
      return res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch(next);
};
