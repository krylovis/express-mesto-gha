const Cards = require('../models/card');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,

  DEFAULT_ERROR,
  INVALID_CARD_DATA,
  CARD_NOT_FOUND,
  CARD_NONEXISTENT,
  NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { id } = req.user;

  Cards.create({ name, link, owner: id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_CARD_DATA });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.id)
    .then((findCard) => {
      if (!findCard) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      if (findCard.owner.toString() !== req.user.id) {
        return res.status(HTTP_STATUS_FORBIDDEN).send({ message: NO_RIGHTS_TO_DELETE });
      }
      return Cards.findByIdAndRemove(req.params.id)
        .then((card) => res.status(HTTP_STATUS_OK).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: CARD_NOT_FOUND });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: CARD_NOT_FOUND });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: CARD_NOT_FOUND });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR });
    });
};
