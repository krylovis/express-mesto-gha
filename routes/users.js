const router = require('express').Router();
const User = require('../models/user');

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  console.log('req', req);
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
