const Cards = require('../models/card');

const NotFoundError = require('../custom-errors/NotFoundError');
const ForbiddenError = require('../custom-errors/ForbiddenError');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  CARD_NONEXISTENT,
  NO_RIGHTS_TO_DELETE,
} = require('../utils/constants');

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
        throw new ForbiddenError(NO_RIGHTS_TO_DELETE);
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
