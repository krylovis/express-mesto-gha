const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const {
  WRONG_EMAIL_FORMAT, WRONG_EMAIL_OR_PASSWORD, WRONG_LINK_FORMAT,
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
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
      message: WRONG_LINK_FORMAT,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (value) => validator.isEmail(value),
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
      if (!user) return null;
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
