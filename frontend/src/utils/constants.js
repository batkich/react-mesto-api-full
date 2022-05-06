export const popupPictureTitle = document.querySelector(
  ".popup__title_type_picture"
);
export const popupPicture = document.querySelector(".popup__picture");
export const popupPictureBox = document.querySelector(".popup_type_picture");
export const profileName = document.querySelector(".profile__info-name");
export const profileInfo = document.querySelector(".profile__info-text");
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileFormElement = document.querySelector(
  ".popup__form_type_profile"
);
export const nameInput = profileFormElement.elements.nickname;
export const jobInput = profileFormElement.elements.info;
export const addButton = document.querySelector(".profile__link-add");
export const editButton = document.querySelector(".profile__link-edit");
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupCard = document.querySelector(".popup_type_card");
export const cardForm = document.querySelector(".popup__form_type_card");
export const newPlace = cardForm.elements.newplace;
export const newPicture = cardForm.elements.picture;
export const container = document.querySelector(".elements");
export const delPopup = document.querySelector('.popup_type_delete');
export const avatarButton = document.querySelector('.profile__avatar-box');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const popupAvatarButton = avatarPopup.querySelector('.popup__button');
export const popupProfileButton = popupProfile.querySelector('.popup__button');
export const popupCardButton = popupCard.querySelector('.popup__button');
export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

