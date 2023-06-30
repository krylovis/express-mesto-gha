const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PAGE_NOT_FOUND } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

const usersRoutes = require('./routes/usersRoutes');
const cardsRoutes = require('./routes/cardsRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64992817c39a0378e2d6e2a4',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => res.status(404).send({ message: PAGE_NOT_FOUND }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
