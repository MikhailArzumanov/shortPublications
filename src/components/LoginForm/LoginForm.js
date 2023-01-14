import React from 'react';
import { getValById } from '../../-functions/getValById';
import { ErrorsService } from '../../-services/-base-services/errors.service';
import { TokensService } from '../../-services/-base-services/tokens.service';
import { UsersService } from '../../-services/users.service';
import './LoginForm.css';

const LOGIN_FIELD_ID    = "loginField";
const PASSWORD_FIELD_ID = "passwordField";

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.swap = this.swap.bind(this);
        this.authorize = this.authorize.bind(this);
    }
    
    swap(){
        this.props.parent.swap();
    }
    
    
    showError(text){
        //
    }

    async authorize(){
        let login    = getValById(LOGIN_FIELD_ID);
        let password = getValById(PASSWORD_FIELD_ID);
        let response = await UsersService.login(login, password);
        if(response) {
            TokensService.setAuthData(response);
            window.location.reload();
        }
        else{
            this.showError(ErrorsService.getLastError());
        }
    }


    render() {
        return (
            <div className="loginForm">
            <input type="text"     placeholder='Логин'  id={LOGIN_FIELD_ID}/>
            <input type="password" placeholder='Пароль' id={PASSWORD_FIELD_ID}/>
            <div className='buttonsWrapper'>
                <button onClick={this.authorize}>Авторизоваться</button>
                <button onClick={this.swap} className='swapBtn'>Зарегистрироваться</button>
            </div>
            </div>
        );
    }
}

export default LoginForm;
