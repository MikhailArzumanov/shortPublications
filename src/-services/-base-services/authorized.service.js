import {BaseService} from "./base.service.js";

export const USER_DATA_KEY          = 'user'
export const TOKEN_KEY              = 'token'
export const AUTHORIZATION_DATA_KEY = 'authorizationData'

export class AuthorizedService extends BaseService{
    static token;
    static authorizationData;
    static userData;

    static getTokenHeaders(){
        let token = this.getToken
        let headers = {'Authorization': `Bearer ${token}`}
        return headers
    }

    static get getToken() {
        if (!this.token) {
            this.token = sessionStorage.getItem(TOKEN_KEY);
        }
        return this.token ? this.token : null;
    }
    static get getAuthorizationData(){
        if(!this.authorizationData){
            this.authorizationData = JSON.parse(sessionStorage.getItem(AUTHORIZATION_DATA_KEY));
        }
        return this.authorizationData;
    }

    static get getUserData(){
        if(!this.userData){
            this.userData = JSON.parse(sessionStorage.getItem(USER_DATA_KEY));
        }
        return this.userData;
    }

    static clearAuthData(){
        if(!this.isAuthorized()) return;
        sessionStorage.removeItem(USER_DATA_KEY)         ;
        sessionStorage.removeItem(TOKEN_KEY)             ;
        sessionStorage.removeItem(AUTHORIZATION_DATA_KEY);
    }

    static isAuthorized(){
        let user = this.getUserData;
        return !!user;
    }

    static logout(){
        sessionStorage.removeItem(USER_DATA_KEY)         ;
        sessionStorage.removeItem(AUTHORIZATION_DATA_KEY);
        sessionStorage.removeItem(TOKEN_KEY)             ;
    }
}
