const { celebrate, Joi } = require('celebrate');

// User
module.exports.createUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(http|https):\/\/[^ "]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.loginSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.getUserSchema = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports.updateUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateAvatarSchema = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(http|https):\/\/[^ "]+$/),
  }),
});

// Card
module.exports.createCardSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(http|https):\/\/[^ "]+$/),
  }),
});

module.exports.updateCardSchema = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
});
