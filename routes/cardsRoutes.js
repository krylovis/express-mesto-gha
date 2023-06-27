const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/controllerCards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

module.exports = router;
