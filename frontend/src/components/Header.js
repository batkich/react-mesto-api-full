import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  let mail = '';
  let link = '';
  let way = ''
  if (props.name === 'signin') {
    link = 'Регистрация';
    way = './sign-up';
  } else if (props.name === 'signup') {
    link = 'Войти';
    way = './sign-in';
  } else {
    mail = props.userData;
    link = 'Выйти'
    way = './sign-in'
  }

  function signOut() {
    localStorage.removeItem('token')
  }

  return (
    <header className="header">
      <a href="./index.html" className="header__logo" target="_blank"> </a>
      <div className="header__login">
        <p className="header__email">{mail}</p>
        <Link className="link link_type_header" to={way} onClick={signOut}>{link}
        </Link>
      </div>
      <div className="header__line">
      </div>
    </header>
  )
}

export default Header
