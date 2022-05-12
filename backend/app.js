const express = require('express');

require('dotenv').config();

const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { celebrate, Joi } = require('celebrate');

const { errors } = require('celebrate');

const Notfound = require('./errors/notfound');

const userRout = require('./routs/userRout');

const cardRout = require('./routs/cardRout');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3030 } = process.env;

const app = express();

const {
  userCreate, login,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i),
  }),
}), userCreate);
app.use(auth);
app.use('/users', userRout);
app.use('/cards', cardRout);
app.use('/', () => {
  throw new Notfound('Нет такой страницы');
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
