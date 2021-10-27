import React from 'react';

function EntranceForm(props) {

    const [data, setData] = React.useState({
        password: '', 
        email: '',
    });

    function handleChange(e) {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.login(data);
    }
    
    return (
        <form onSubmit={handleSubmit} name="register" className="entrance-form">
            <section className="entrance-form__element">
                <input 
                value={data.email || ''} 
                onChange={handleChange}
                name="email" 
                type="email" 
                placeholder="Email"
                className="entrance-form__input" 
                required 
                minLength={2} 
                maxLength={40} />
            </section>
            <section className="entrance-form__element">
                <input 
                value={data.password || ''} 
                onChange={handleChange}
                name="password"
                type="password" 
                placeholder="Пароль" 
                className="entrance-form__input" 
                required 
                minLength={2} 
                maxLength={40} />
            </section>
            <button type="submit" className="entrance-form__submit">{props.buttonText}</button>
        </form>
    );
}

export default EntranceForm;