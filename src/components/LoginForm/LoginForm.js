import React from 'react';
import { getValById } from '../../-functions/getValById';
import './LoginForm.css';

const LOGIN_FIELD_ID    = "loginField";
const PASSWORD_FIELD_ID = "passwordField";

class LoginForm extends React.Component {
    authorize(){
        let login    = getValById(LOGIN_FIELD_ID);
        let password = getValById(PASSWORD_FIELD_ID);
        console.log(`Login: ${login}; Password: ${password}`);
        //UsersService.authorize(login, password);
    }
    render() {
        return (
            <div className="loginForm">
            <input type="text"     placeholder='Логин'  id={LOGIN_FIELD_ID}/>
            <input type="password" placeholder='Пароль' id={PASSWORD_FIELD_ID}/>
            <button onClick={this.authorize}>Авторизоваться</button>
            </div>
        );
    }
}

export default LoginForm;
