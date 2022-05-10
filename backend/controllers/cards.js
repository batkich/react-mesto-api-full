const Card = require('../models/card');

const BadRequest = require('../errors/badRequest');
const Notfound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');

const findAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const cardCreate = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({
    name, link, owner,
  })

    .then((card) => {
      const {
        // eslint-disable-next-line no-shadow
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequest('Переданы некорректные данные'));
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new Notfound('Запрашиваемая карточка не найдена');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new Forbidden('Нет прав');
      }
      return card.remove()
        .then(() => {
          res.send({
            message: 'Успешно!',
          });
        });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequest('Запрашиваемая карточка не найдена'));
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!req.user._id) {
        throw new BadRequest('Переданы некорректные данные');
      }
      if (!card) {
        throw new Notfound('Запрашиваемый пользователь не найден');
      }
      const {
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequest('Запрашиваемая карточка не найдена'));
      return next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!req.user._id) {
        throw new BadRequest('Переданы некорректные данные');
      }
      if (!card) {
        throw new Notfound('Запрашиваемый пользователь не найден');
      }
      const {
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return next(new Notfound('Запрашиваемая карточка не найдена'));
      return next(err);
    });
};

module.exports = {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
};
