import React, { useEffect } from 'react';
import { Route, Switch, NavLink, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelPopup from './DelPopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as entrance from '../utils/entrance.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState({})
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ _id: '', email: '' });

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(el) {
    el.preventDefault();
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardForDelete._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatar(data.avatarLink)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.error(err)
      })
  }

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDelPopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsDelPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' })
  };

  function handleExit() {
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (localStorage.getItem('jwt')) {
      entrance.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              _id: res.data._id,
              email: res.data.email,
            })
            setLoggedIn(true)
          }
        })
        .catch((err) => {
          setIsInfoTooltipOpen(true)
          setIsAuthorized(false)
          console.log(err)
        })
    }
  }

  function handleLogin({ password, email }) {
    entrance.authorize({ password, email })
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck()
          history.push('/')
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true)
        setIsAuthorized(false)
        console.log(err)
      })
  }

  function handleRegister({ password, email }) {
    entrance.register({ password, email })
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true)
          setIsAuthorized(true)
          history.push('/sign-in')
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true)
        setIsAuthorized(false)
        console.log(err)
      })
  }

  const history = useHistory();

  useEffect(() => {
    if (loggedIn === true) {
      history.push('/')
    }
  }, [loggedIn, history])



  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onCardDeleteRequest={handleCardDeleteRequest}
            onCardLike={handleCardLike}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleClick}
            exit={handleExit}
            userMail={userData}
          />

          <Route path='/sign-in'>
            <Header>
              <NavLink to="/sign-up" className="menu__link">Регистрация</NavLink>
            </Header>
            <Login onLogin={handleLogin} />
          </Route>

          <Route path='/sign-up'>
            <Header>
              <NavLink to="/sign-in" className="menu__link">Войти</NavLink>
            </Header>
            <Register onRegister={handleRegister} />
          </Route>

        </Switch>

        <Footer />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isAuthorized={isAuthorized}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <DelPopup
          isOpen={isDelPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete} />

        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;