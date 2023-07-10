const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUserSchema, updateUserSchema, updateAvatarSchema } = require('../middlewares/joiSchemas');

const {
  getUserById,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserSchema, getUser);
router.get('/:id', auth, getUserSchema, getUserById);

router.patch('/me', auth, updateUserSchema, updateUser);
router.patch('/me/avatar', auth, updateAvatarSchema, updateAvatar);

module.exports = router;
