import React from 'react';
import { Link } from 'react-router-dom';
import EntranceForm from './EntranceForm';

function Register(props) {

    return (
        <main className="login">
            <h2 className="login__header">Регистрация</h2>
            <EntranceForm login={props.onRegister} buttonText="Зарегистрироваться"/>
            <Link className="login__link" to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </main>
    );
}
export default Register;