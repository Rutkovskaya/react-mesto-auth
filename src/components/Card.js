import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isMy = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`${isMy ? 'trash-button' : 'trash-button_hidden'}`);
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (`hart-button ${isLiked ? 'hart-button_activ' : ''}`);


  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDeleteRequest(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="card">
      <button
        onClick={handleDeleteClick}
        type="button"
        className={`card__button ${cardDeleteButtonClassName}`} ></button>
      <img
        onClick={handleClick}
        className="card__image"
        src={props.card.link}
        alt={props.card.name} />
      <div className="card__under-line">
        <h2 className="card__text">{props.card.name}</h2>
        <div className="hart-container">
          <button
            onClick={handleLikeClick}
            type="button"
            className={`card__button ${cardLikeButtonClassName}`} ></button>
          <p className="hart-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;