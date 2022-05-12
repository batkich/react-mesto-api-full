import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Register from "./Register";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isAuthPopupOpen, setAuthPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [headerView, setHeaderView] = React.useState("signin");

  const [userData, setUserData] = React.useState("some@mail.ru");

  const [popupValue, setPopupValue] = React.useState({
    pictureType: "register",
    infoText: "Вы успешно зарегистрировались!",
  });

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getProfileInfo()])
        .then(([cards, userData]) => {
          setCards(cards);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, [history.location]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserData(res.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAuthPopup() {
    setAuthPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setAuthPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSignInHeader() {
    setHeaderView("signin");
  }

  function handleSignUpHeader() {
    setHeaderView("signup");
  }

  function handleSignedHeader() {
    setHeaderView("signed");
  }

  function handleLogin(password, email) {
    Auth.authorize(password, email)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
          setUserData(email);
        } else {
          setPopupValue({
            ...popupValue,
            pictureType: "login",
            infoText: "Что-то пошло не так! Попробуйте еще раз.",
          });
          handleAuthPopup();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .setProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setNewAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegister(password, email) {
    Auth.register(password, email)
      .then((res) => {
        if (res) {
          setPopupValue({
            ...popupValue,
            pictureType: "register",
            infoText: "Вы успешно зарегистрировались!",
          });
          handleAuthPopup();
          history.push("./sign-in");
        } else {
          setPopupValue({
            ...popupValue,
            pictureType: "login",
            infoText: "Что-то пошло не так! Попробуйте еще раз.",
          });
          handleAuthPopup();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="root">
          <Header name={headerView} userData={userData} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              handleheader={handleSignedHeader}
            />
            <Route path="/sign-up">
              <Register
                onClose={closeAllPopups}
                handlePopup={handleAuthPopup}
                handleheader={handleSignUpHeader}
                handleRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onClose={closeAllPopups}
                handleheader={handleSignInHeader}
                handleLogin={handleLogin}
                handlePopup={handleAuthPopup}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
        </div>

        <InfoTooltip
          name="auth"
          authValue={isAuthPopupOpen}
          popupClose={closeAllPopups}
          pictureType={popupValue.pictureType}
          link=""
          infoText={popupValue.infoText}
        ></InfoTooltip>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm name="delete" title="Вы уверены?" subMit="Да">
          <button
            type="button"
            className="popup__close-icon popup__close-icon_type_card"
          ></button>
          <h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
        </PopupWithForm>
        <ImagePopup
          name="picture"
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
