const Cards = require('../models/card');
const {
  INVALID_CARD_DATA,
  INVALID_LIKES_DATA,
  CARD_NOT_FOUND,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: INVALID_CARD_DATA });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: CARD_NOT_FOUND });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: CARD_NOT_FOUND });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: INVALID_LIKES_DATA });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: CARD_NOT_FOUND });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: INVALID_LIKES_DATA });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
