const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const User = require('../models/user');

const ConflictError = require('../custom-errors/ConflictError');
const NotFoundError = require('../custom-errors/NotFoundError');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  USER_NONEXISTENT,
  USER_ALREADY_EXISTS,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

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
    }))
    .catch((err) => {
      if (err.code === 11000) throw new ConflictError(USER_ALREADY_EXISTS);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NONEXISTENT);
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

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user.id);
      res.cookie('jwt', token, {
        httpOnly: true, sameSite: true,
      });
      return res.status(HTTP_STATUS_OK);
    })
    .catch(next);
};
