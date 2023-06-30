const User = require('../models/user');
const {
  INVALID_USER_DATA,
  INVALID_USER_UPDATE,
  INVALID_AVATAR_DATA,
  USER_NOT_FOUND,
  USER_NONEXISTENT,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: INVALID_USER_DATA });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send({ message: USER_NONEXISTENT });
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: USER_NOT_FOUND });
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

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: USER_NOT_FOUND });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: INVALID_USER_UPDATE });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: USER_NOT_FOUND });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: INVALID_AVATAR_DATA });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
