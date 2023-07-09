const router = require('express').Router();
const {
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', getUsers);
router.get('/:id', getUserById);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
