const User = require('../models/user');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,

  DEFAULT_ERROR,
  INVALID_USER_DATA,
  INVALID_USER_UPDATE,
  INVALID_AVATAR_DATA,
  USER_NOT_FOUND,
  USER_NONEXISTENT,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_USER_DATA });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: USER_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: USER_NOT_FOUND });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_USER_UPDATE });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_AVATAR_DATA });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};
