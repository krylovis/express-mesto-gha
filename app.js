// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

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

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
