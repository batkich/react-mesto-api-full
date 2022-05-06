import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  const [name, setName] = React.useState('');

  const [description, setDescription] = React.useState('');

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} subMit="Сохранить" onSubmit={handleSubmit} titleClass="profile"
    >
      <input type="text" value={name || ''} onChange={handleSetName} id="popup__nickname" name="nickname" placeholder="Имя" className="popup__input" minLength="2"
        maxLength="40" required />
      <span className="popup__error popup__nickname-error"></span>
      <input type="text" value={description || ''} onChange={handleSetDescription} id="popup__info" name="info" placeholder="О себе" className="popup__input" minLength="2"
        maxLength="200" required />
      <span className="popup__error popup__info-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
