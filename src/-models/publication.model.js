export class Publication{
    id          ;
    text        ;
    setTime     ;
    author      ;
    commentaries;
    constructor(id, text, setTime, author, commentaries = []){
        this.id           = id          ;
        this.text         = text        ;
        this.setTime      = setTime     ;
        this.author       = author      ;
        this.commentaries = commentaries;
    }
}