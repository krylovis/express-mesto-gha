const http2 = require('node:http2');

const { constants } = http2;
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,

  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,

  HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

module.exports.PAGE_NOT_FOUND = 'Страница не найдена';
module.exports.DEFAULT_ERROR = 'Ошибка по умолчанию';

module.exports.INVALID_USER_DATA = 'Переданы некорректные данные при создании пользователя';
module.exports.INVALID_USER_UPDATE = 'Переданы некорректные данные при обновлении профиля';
module.exports.INVALID_AVATAR_DATA = ' Переданы некорректные данные при обновлении аватара';
module.exports.USER_NOT_FOUND = 'Пользователь с указанным ID не найден';
module.exports.USER_NONEXISTENT = 'Передан несуществующий ID пользователя';

module.exports.INVALID_CARD_DATA = 'Переданы некорректные данные при создании карточки';
module.exports.INVALID_LIKES_DATA = 'Переданы некорректные данные для постановки/снятии лайка';
module.exports.CARD_NOT_FOUND = 'Карточка с указанным ID не найдена';
module.exports.CARD_NONEXISTENT = 'Передан несуществующий ID карточки';
