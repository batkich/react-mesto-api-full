const userRout = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  sendUser, findAll, updateProfile, updateAvatar, selectedUser,
} = require('../controllers/users');

userRout.get('/', findAll);
userRout.get('/me', selectedUser);
userRout.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), sendUser);
userRout.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRout.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i),
  }),
}), updateAvatar);

module.exports = userRout;
