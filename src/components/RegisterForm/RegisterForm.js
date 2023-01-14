import React from 'react';
import { getValById } from '../../-functions/getValById';
import { User } from '../../-models/user.model';
import { ErrorsService } from '../../-services/-base-services/errors.service';
import { TokensService } from '../../-services/-base-services/tokens.service';
import { UsersService } from '../../-services/users.service';
import './RegisterForm.css';

const USERNAME_FIELD_ID = "usernameField";
const LOGIN_FIELD_ID    = "loginField";
const PASSWORD_FIELD_ID = "passwordField";
const CONFIRM_FIELD_ID = "confirmPasswordField";

class RegisterForm extends React.Component {
    constructor(props){
        super(props);

        this.swap = this.swap.bind(this);
        this.register = this.register.bind(this);
    }
    
    swap(){
        this.props.parent.swap();
    }
    
    showError(text){
        //
    }

    async register(){
        let username = getValById(USERNAME_FIELD_ID);
        let login    = getValById(LOGIN_FIELD_ID);

        let password        = getValById(PASSWORD_FIELD_ID);
        let passwordConfirm = getValById(CONFIRM_FIELD_ID);
        if(password != passwordConfirm) this.showError('Пароли не совпадают');

        let user = new User(null, login, password, username, false, false);
        let response = await UsersService.register(user);
        if(response) {
            let loginResp = await UsersService.login(user.login, user.password);
            if(loginResp){
                TokensService.setAuthData(loginResp);
                window.location.reload();
            }
            else this.showError(ErrorsService.getLastError());
        }
        else{
            this.showError(ErrorsService.getLastError());
        }
    }
    render() {
        return (
            <div className="loginForm">
            <input type="username" placeholder='Имя пользователя'     id={USERNAME_FIELD_ID}/>
            <br/>
            <br/>
            <input type="text"     placeholder='Логин'                id={LOGIN_FIELD_ID}/>
            <input type="password" placeholder='Пароль'               id={PASSWORD_FIELD_ID}/>
            <input type="password" placeholder='Подтверждение пароля' id={CONFIRM_FIELD_ID}/>
            <div className='buttonsWrapper'>
                <button onClick={this.register}>Зарегистрироваться</button>
                <button onClick={this.swap} className='swapBtn'>Авторизоваться</button>
            </div>
            </div>
        );
    }
}

export default RegisterForm;
