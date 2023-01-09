export class User{
    id       ;
    login    ;
    password ;
    username ;
    isAdmin  ;
    wasBanned;
    constructor(id, login, password, username, isAdmin, wasBanned){
        this.id        = id       ;
        this.login     = login    ;
        this.password  = password ;
        this.username  = username ;
        this.isAdmin   = isAdmin  ;
        this.wasBanned = wasBanned;
    }
}