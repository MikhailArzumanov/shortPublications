export class PublicationRequest{
    publication;
    authData;
    constructor(publication, authData){
        this.publication = publication;
        this.authData    = authData;
    }
}