const cardRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRout.get('/', findAllCards);
cardRout.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i),
  }),
}), cardCreate);
cardRout.delete('/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);
cardRout.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), likeCard);
cardRout.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteLikeCard);

module.exports = cardRout;
