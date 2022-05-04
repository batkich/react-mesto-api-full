const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { celebrate, Joi } = require('celebrate');

const { errors } = require('celebrate');

const Notfound = require('./errors/notfound');

const userRout = require('./routs/userRout');

const cardRout = require('./routs/cardRout');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

const {
  userCreate, login,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
