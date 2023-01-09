export class UserRedactionRequest{
    authData;
    userData;
    constructor(authData, userData){
        this.authData = authData;
        this.userData = userData;
    }
}