const router = require('express').Router();
const { createUser, getUserById, getUsers } = require('../controllers/controllerUsers');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
