const http2 = require('http2');

const { constants } = http2;
const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED, // 201

  HTTP_STATUS_BAD_REQUEST, // 400
  HTTP_STATUS_UNAUTHORIZED, // 401
  HTTP_STATUS_FORBIDDEN, // 403
  HTTP_STATUS_NOT_FOUND, // 404
  HTTP_STATUS_CONFLICT, // 409

  HTTP_STATUS_INTERNAL_SERVER_ERROR, // 500,
} = constants;

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,

  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,

  HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

module.exports.DEFAULT_NAME = 'Жак-Ив Кусто';
module.exports.DEFAULT_ABOUT = 'Исследователь';
module.exports.DEFAULT_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

module.exports.NEEDED_AUTHORIZATION = 'Необходима авторизация';
module.exports.NO_RIGHTS_TO_DELETE = 'Нет прав для удаления';
module.exports.PAGE_NOT_FOUND = 'Страница не найдена';
module.exports.DEFAULT_ERROR = 'Ошибка по умолчанию';

module.exports.INVALID_USER_DATA = 'Переданы некорректные данные при создании пользователя';
module.exports.INVALID_USER_UPDATE = 'Переданы некорректные данные при обновлении профиля';
module.exports.INVALID_AVATAR_DATA = ' Переданы некорректные данные при обновлении аватара';
module.exports.USER_NOT_FOUND = 'Пользователь с указанным ID не найден';
module.exports.USER_NONEXISTENT = 'Передан несуществующий ID пользователя';
module.exports.USER_ALREADY_EXISTS = 'Пользователь уже существует';

module.exports.INVALID_CARD_DATA = 'Переданы некорректные данные при создании карточки';
module.exports.INVALID_LIKES_DATA = 'Переданы некорректные данные для постановки/снятии лайка';
module.exports.CARD_NOT_FOUND = 'Карточка с указанным ID не найдена';
module.exports.CARD_NONEXISTENT = 'Передан несуществующий ID карточки';

module.exports.WRONG_EMAIL_FORMAT = 'Неправильный формат почты';
module.exports.WRONG_LINK_FORMAT = 'Неправильный формат ссылки';
module.exports.WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
