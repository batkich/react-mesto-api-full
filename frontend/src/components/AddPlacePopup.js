import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [link, setLink] = React.useState("");

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setLink("");
    setName("");
  }, [props.isOpen]);

  function handleSetLink(e) {
    setLink(e.target.value);
  }

  function handleSetCardName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      link,
      name,
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      subMit="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name || ""}
        onChange={handleSetCardName}
        id="popup__newplace"
        name="newplace"
        placeholder="Название"
        className="popup__input"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error popup__newplace-error"></span>
      <input
        type="url"
        value={link || ""}
        onChange={handleSetLink}
        id="popup__picture"
        name="picture"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
      />
      <span className="popup__error popup__picture-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
