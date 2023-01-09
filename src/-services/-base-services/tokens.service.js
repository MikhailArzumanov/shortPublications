import { AUTHORIZATION_DATA_KEY, TOKEN_KEY, USER_DATA_KEY } from "./authorized.service.js";


export class TokensService{
    static setAuthData(authResponse){
        let token    = authResponse.token;
        let authData = authResponse.authData;
        let userData = authResponse.user;

        sessionStorage.setItem(TOKEN_KEY, token);
        
        this.setDataToStorage(AUTHORIZATION_DATA_KEY, authData);
        this.setDataToStorage(USER_DATA_KEY,          userData);
        this.setDataToStorage(TOKEN_KEY,                 token);
    }

    static setDataToStorage(key, obj){
        let jsonObj = JSON.stringify(obj);
        sessionStorage.removeItem(key);
        sessionStorage.setItem(key, jsonObj);
    }

}