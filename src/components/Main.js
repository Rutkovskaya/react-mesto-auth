import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const onEditAvatar = () => {
    props.onEditAvatar();
  }

  const onEditProfile = () => {
    props.onEditProfile();
  }

  const onAddPlace = () => {
    props.onAddPlace();
  }


  return (
    <>
    <Header>
        <NavLink exact to="/" activeClassName="menu__link_active" className="menu__link">{props.userMail.email}</NavLink>
        <NavLink onClick={props.exit} to="/sign-in" className="menu__link">Выйти</NavLink>
    </Header>

    <main className="page">
      <section className="profile">

        <div className="profile__avatar">
          <img className="avatar" src={currentUser.avatar} alt="Аватарка" />
          <button onClick={onEditAvatar} type="button" className="button-ava"></button>
        </div>

        <div className="profile-info">
          <div className="profile-info__block">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" className="profile-info__edit-button"></button>
          </div>
          <p className="profile-info__status">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="add-button"></button>
      </section>

      <section className="photo-grid">
        {props.cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardDeleteRequest={props.onCardDeleteRequest}
            onCardLike={props.onCardLike} />
        ))}
      </section>


    </main>
    </>
  )
}
export default Main;