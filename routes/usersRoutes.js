const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);

router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
