import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatarLink: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            name="avatarLink"
            title="Обновить аватар"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <section className="form__section">
                <input
                    ref={avatarRef}
                    name="avatarLink"
                    type="url"
                    placeholder="Ссылка на новый аватар"
                    className="popup__text popup__text_type_url"
                    required />
                <span className="popup__text-error" id="avatarLink-error"> </span>
            </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;