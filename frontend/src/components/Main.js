import React from 'react';
import Vector from '../../src/images/Vector2.svg';
import Card from '../components/Card.js'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    props.handleheader();
  },);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-box" onClick={props.onEditAvatar}>
          <img className="profile__avatar-cursor" src={Vector} alt="Курсор аватара профиля" />
          <img className="profile__avatar"
            src={`${currentUser.avatar}`} alt="Аватар профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <button type="button" className="profile__link-edit" onClick={props.onEditProfile}>
          </button>
          <p className="profile__info-text">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__link-add" onClick={props.onAddPlace}>
        </button>
      </section>
      <ul className="elements">

        {props.cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </ul>
    </main>
  )
}

export default Main
