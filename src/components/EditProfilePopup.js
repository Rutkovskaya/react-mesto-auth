import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, makeName] = React.useState('');
    const [description, makeDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        makeName(currentUser.name);
        makeDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name, about: description,
        });
    }

    function handleChangeUserName(e) {
        makeName(e.target.value)
    }

    function handleChangeUserDescription(e) {
        makeDescription(e.target.value)
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <section className="form__section">
                <input
                    value={name || ''}
                    onChange={handleChangeUserName}
                    name="name"
                    type="text"
                    placeholder="Имя"
                    className="popup__text popup__text_type_name"
                    required
                    minLength={2}
                    maxLength={40}/>
                <span className="popup__text-error" id="name-error"></span>
            </section>
            <section className="form__section">
                <input
                    value={description || ''}
                    onChange={handleChangeUserDescription}
                    name="about"
                    type="text"
                    placeholder="Статус"
                    className="popup__text popup__text_type_status"
                    required
                    minLength={2}
                    maxLength={40} />
                <span className="popup__text-error" id="status-error"></span>
            </section>
        </PopupWithForm>

    )
}

export default EditProfilePopup