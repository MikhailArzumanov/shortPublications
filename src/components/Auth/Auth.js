import React from 'react';
import { getValById } from '../../-functions/getValById';
import { TokensService } from '../../-services/-base-services/tokens.service';
import { UsersService } from '../../-services/users.service';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './Auth.css';

const LOGIN_FIELD_ID    = "loginField";
const PASSWORD_FIELD_ID = "passwordField";

class Auth extends React.Component {
    toRegister = false;
    
    swap(){
        this.toRegister = !this.toRegister;
        this.forceUpdate();
    }
    
    render() {
        let block = this.toRegister?<RegisterForm parent={this}/>:<LoginForm parent={this}/>;
        return block;
    }
}

export default Auth;
