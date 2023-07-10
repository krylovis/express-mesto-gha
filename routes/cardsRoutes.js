const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createCardSchema, updateCardSchema } = require('../middlewares/joiSchemas');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');

router.get('/', auth, getCards);
router.post('/', auth, createCardSchema, createCard);
router.delete('/:id', auth, updateCardSchema, deleteCard);

router.put('/:id/likes', auth, updateCardSchema, likeCard);
router.delete('/:id/likes', auth, updateCardSchema, dislikeCard);

module.exports = router;
