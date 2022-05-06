import React from "react";

function InfoTooltip(props) {
  function onAuthClose() {
    props.popupClose();
  }

  return (
    <div
      className={
        props.authValue
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.authValue}`
      }
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          type="button"
          className="popup__close-icon popup__close-icon_type_picture"
          onClick={onAuthClose}
        ></button>
        <div
          className={`popup__picture popup__picture_type_${props.pictureType}`}
        ></div>
        <p className="popup__title popup__title_type_auth">{props.infoText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
