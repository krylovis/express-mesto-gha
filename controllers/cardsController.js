const Cards = require('../models/card');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_FORBIDDEN,

  CARD_NONEXISTENT,
  NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { id } = req.user;

  Cards.create({ name, link, owner: id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.id)
    .then((findCard) => {
      if (!findCard) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      if (findCard.owner.toString() !== req.user.id) {
        return res.status(HTTP_STATUS_FORBIDDEN).send({ message: NO_RIGHTS_TO_DELETE });
      }
      return Cards.findByIdAndRemove(req.params.id)
        .then((card) => res.status(HTTP_STATUS_OK).send(card));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(HTTP_STATUS_NOT_FOUND).send({ message: CARD_NONEXISTENT });
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => next(err));
};
