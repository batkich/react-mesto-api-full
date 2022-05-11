const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequest = require('../errors/badRequest');
const Unauthorized = require('../errors/unauthorized');
const Notfound = require('../errors/notfound');
const Conflict = require('../errors/conflict');

const sendUser = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new Notfound('Запрашиваемый пользователь не найден');
      }
      const {
        _id, name, about, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequest('Запрашиваемый пользователь не найден'));
      return next(err);
    });
};

const userCreate = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const newUser = {
        email: user.email, name: user.name, about: user.about, avatar: user.avatar,
      };
      res.send({
        newUser,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequest('Переданы некорректные данные'));
      if (err.code === 11000) return next(new Conflict('Email уже используется'));
      return next(err);
    });
};

const findAll = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const currentUser = req.user._id;
  const reqName = name;
  const reqAbout = about;

  User.findByIdAndUpdate(currentUser, {
    name, about,
  }, { runValidators: true, new: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      // eslint-disable-next-line no-use-before-define
      if (!req.user) {
        throw new BadRequest('Переданы некорректные данные');
      }
      if (!reqName || !reqAbout) {
        throw new BadRequest('Переданы некорректные данные');
      }
      const {
        // eslint-disable-next-line no-shadow
        _id, name, about, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequest('Переданы некорректные данные'));
      if (err.name === 'CastError') return next(new BadRequest('Переданы некорректные данные'));
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const currentUser = req.user._id;

  User.findByIdAndUpdate(currentUser, {
    avatar,
  }, { runValidators: true, new: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!req.user) {
        throw new BadRequest('Переданы некорректные данные');
      }
      const {
        // eslint-disable-next-line no-shadow
        avatar, name, about,
      } = user;
      res.send({
        avatar, name, about,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequest('Переданы некорректные данные'));
      if (err.name === 'CastError') return next(new BadRequest('Переданы некорректные данные'));
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'topsecret-token',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, SameSite: 'None', secure: true, Domain: 'santyagobatkich.students.nomoredomains.xyz',
      });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Авторизация неуспешна, проверьте логин или пароль'));
    });
};

const selectedUser = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        throw new Notfound('Запрашиваемый пользователь не найден');
      }
      const {
        _id, email, name, about, avatar,
      } = user;
      res.send({
        name, email, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequest('Запрашиваемый пользователь не найден'));
      return next(err);
    });
};

module.exports = {
  sendUser, findAll, userCreate, updateProfile, updateAvatar, login, selectedUser,
};
