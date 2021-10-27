import React from 'react';
import EntranceForm from './EntranceForm';

function Login(props) {

    return (
        <main className="login">
            <h2 className="login__header">Вход</h2>
            <EntranceForm
                login={props.onLogin}
                buttonText="Войти"
            />
        </main>
    );
}
export default Login;