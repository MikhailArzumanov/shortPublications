import { http } from '../-http/http.js';
import { AuthData } from '../-models/auth-data.model.js';
import {AuthorizedService} from './-base-services/authorized.service.js';
import { PublicationRequest } from './-models/publication-request.model.js';
import { UserRedactionRequest } from './-models/user-redaction-request.model.js';

export class PublicationsService extends AuthorizedService{
    static CONTROLLER_NAME = 'publications';
    static CONTROLLER_URL  = this.SERVICE_URL+this.CONTROLLER_NAME;

    static async getList(lastId = 0, pageSize = 20){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {pageSize: pageSize, lastId: lastId};
        let body = null;
        
        return await http.get(url,headers,params,false);
    }
    
    static async getConcrete(id){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}/${id}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let body = null;
        
        return await http.get(url,headers,params,false);
    }
    
    static async publicate(publicationModel){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let authData = this.getAuthorizationData;
        let body = new PublicationRequest(publicationModel, authData);
        
        return await http.post(url,headers,params,body,false);
    }

    static async redact(publicationModel){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}/${publicationModel.id}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let authData = this.getAuthorizationData;
        let body = new PublicationRequest(publicationModel, authData);
        
        return await http.put(url,headers,params,body,false);
    }

    static async delete(id){
        let METHOD_NAME = '';
        let url = `${this.CONTROLLER_URL}/${id}`;
        let headers = {};
            headers['Content-Type'] = "application/json;charset=UTF-8";
        let params = {};
        let body = this.getAuthorizationData;
        
        return await http.delete(url,headers,params,body,false);
    }
}