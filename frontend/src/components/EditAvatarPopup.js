import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (avatarRef.current !== undefined) {
      props.onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
      console.log(avatarRef.current.value)
    }
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      subMit="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={avatarRef}
        id="popup__avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
      />
      <span className="popup__error popup__avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
