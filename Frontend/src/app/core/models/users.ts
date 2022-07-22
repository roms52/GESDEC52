export class Users {

    public id: string | undefined;
    public username: string | undefined;
    public email: string | undefined;
    public password: string | undefined;
    public id_role : string | undefined;
    public role : string | undefined;

    constructor(obj: any) {
        Object.assign(this,obj);
}
}