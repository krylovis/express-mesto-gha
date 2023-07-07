const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { WRONG_EMAIL_FORMAT } = require('../utils/constants');
const { DEFAULT_NAME, DEFAULT_ABOUT, DEFAULT_AVATAR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: DEFAULT_NAME,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: DEFAULT_ABOUT,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: WRONG_EMAIL_FORMAT,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
