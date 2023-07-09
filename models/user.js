const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const {
  WRONG_EMAIL_FORMAT, WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/constants');
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
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
