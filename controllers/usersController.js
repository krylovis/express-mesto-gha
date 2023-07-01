const User = require('../models/user');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send({ message: HTTP_STATUS_NOT_FOUND });
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: HTTP_STATUS_NOT_FOUND });
      if (err.name === 'ValidationError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
