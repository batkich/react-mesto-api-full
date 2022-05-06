function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
      <div className={`popup__container popup__container_type_${props.popupContainerClass}`}>
        <button type="button" className={`popup__close-icon popup__close-icon_type_${props.titleClass}`} onClick={props.onClose}></button>
        <h2 className={`popup__title popup__title_type_${props.titleClass}`}>{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.titleClass}`} name="profile-form" onSubmit={props.onSubmit} noValidate >
          {props.children}
          <button type="submit" className={`popup__button popup__button_type_${props.titleClass}`} onClick={props.onSubmit}>{props.subMit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
