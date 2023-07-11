const Cards = require('../models/card');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_FORBIDDEN,

  CARD_NONEXISTENT,
  NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

const NotFoundError = require('../custom-errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { id } = req.user;

  Cards.create({ name, link, owner: id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.id)
    .then((findCard) => {
      if (!findCard) throw new NotFoundError(CARD_NONEXISTENT);
      if (findCard.owner.toString() !== req.user.id) {
        return res.status(HTTP_STATUS_FORBIDDEN).send({ message: NO_RIGHTS_TO_DELETE });
      }
      return Cards.findByIdAndRemove(req.params.id)
        .then((card) => res.status(HTTP_STATUS_OK).send(card));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError(CARD_NONEXISTENT);
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError(CARD_NONEXISTENT);
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};
