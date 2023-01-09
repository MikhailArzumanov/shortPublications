import React from 'react';
import { getValById } from '../../-functions/getValById';
import { TokensService } from '../../-services/-base-services/tokens.service';
import { UsersService } from '../../-services/users.service';
import './LoginForm.css';

const LOGIN_FIELD_ID    = "loginField";
const PASSWORD_FIELD_ID = "passwordField";

class LoginForm extends React.Component {
    async authorize(){
        let login    = getValById(LOGIN_FIELD_ID);
        let password = getValById(PASSWORD_FIELD_ID);
        let response = await UsersService.login(login, password);
        if(response) {
            TokensService.setAuthData(response);
            window.location.reload();
        }
        else{

        }
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
