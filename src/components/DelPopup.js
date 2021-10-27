import React from 'react';
import PopupWithForm from './PopupWithForm';

function DelPopup(props) {
    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            name="trash"
            title="Вы уверены?"
            buttonText="Да"
            onSubmit={props.onSubmit} />
    )
}

export default DelPopup;