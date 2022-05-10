import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);


  const isOwn = props.card.owner === currentUser._id;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button" : "element__delete-button_disabled"
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button_type_active" : "element__button"
  }`;

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__picture"
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        onClick={handleClick}
      />
      <div className="element__footer">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__button-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__button-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
