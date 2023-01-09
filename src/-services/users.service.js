import { http } from '../-http/http.js';
import { AuthData } from '../-models/auth-data.model.js';
import {AuthorizedService} from './-base-services/authorized.service.js';
import { UserRedactionRequest } from './-models/user-redaction-request.model.js';

export class UsersService extends AuthorizedService{
    static CONTROLLER_NAME = 'users';
    static CONTROLLER_URL  = this.SERVICE_URL+this.CONTROLLER_NAME;

    static async login(login, password){
        let METHOD_NAME = 'token';
        let url = `${this.CONTROLLER_URL}/${METHOD_NAME}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let body = new AuthData(login, password);
        
        return await http.post(url,headers,params,body,false);
    }
    
    static async register(userModel){
        let METHOD_NAME = 'register';
        let url = `${this.CONTROLLER_URL}/${METHOD_NAME}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let body = userModel;
        
        return await http.post(url,headers,params,body,false);
    }
    
    static async redact(userModel, login, password){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}/${userModel.id}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let authData = new AuthData(login, password);
        let body = new UserRedactionRequest(authData, userModel);
        
        return await http.put(url,headers,params,body,false);
    }

    static async redact(userId){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}/${userId}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let body = null;
        
        return await http.put(url,headers,params,body,false);
    }
}