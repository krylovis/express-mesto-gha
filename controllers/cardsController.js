const Cards = require('../models/card');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
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
      if (err.name === 'ValidationError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) return res.status(404).send({ message: HTTP_STATUS_NOT_FOUND });
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(404).send({ message: HTTP_STATUS_NOT_FOUND });
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(404).send({ message: HTTP_STATUS_NOT_FOUND });
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: HTTP_STATUS_BAD_REQUEST });
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
