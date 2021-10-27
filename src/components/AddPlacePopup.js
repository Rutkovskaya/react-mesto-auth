import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleCardName(e) {
        setName(e.target.value)
    }

    function handleCardLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            name="addcard"
            title="Новое место"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <section className="form__section">
                <input
                    value={name}
                    onChange={handleCardName}
                    name="name"
                    type="text"
                    placeholder="Название"
                    className="popup__text popup__text_type_place"
                    required
                    minLength={2}
                    maxLength={30}/>
                <span className="popup__text-error" id="nameplace-error"></span>
            </section>
            <section className="form__section">
                <input
                    value={link}
                    onChange={handleCardLink}
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="popup__text popup__text_type_url"
                    required/>
                <span className="popup__text-error" id="url-error"></span>
            </section>
        </PopupWithForm>


    )
}

export default AddPlacePopup;