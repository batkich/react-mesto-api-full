import React from "react";
import PopupWithForm from "./PopupWithForm";
import { Link } from "react-router-dom";

function Register(props) {
  React.useEffect(() => {
    props.handleheader();
  });

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(password, email);
  }

  return (
    <div className="content content_type_sign">
      <PopupWithForm
        name="login"
        title="Регистрация"
        subMit="Зарегестрироваться"
        titleClass="sign"
        popupContainerClass="sign"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          onChange={handleSetEmail}
          placeholder="Email"
          className="popup__input popup__input_type_sign"
          minLength="2"
          maxLength="40"
          required
        />
        <input
          type="password"
          onChange={handleSetPassword}
          name="info"
          placeholder="Пароль"
          className="popup__input popup__input_type_sign"
          minLength="2"
          maxLength="200"
          required
        />
      </PopupWithForm>
      <Link className="link link_type_sign" to="./sign-in">
        Уже зарегестрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
