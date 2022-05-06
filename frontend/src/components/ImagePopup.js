function ImagePopup(props) {
  return (
    <div className={props.card.name ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
      <div className="popup__container popup__container_type_picture">
        <button type="button" className="popup__close-icon popup__close-icon_type_picture" onClick={props.onClose}></button>
        <img className="popup__picture" src={`${props.card.link}`} alt={`${props.card.name}`} />
        <h2 className="popup__title popup__title_type_picture">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup
