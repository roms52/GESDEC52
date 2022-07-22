export class Users_Roles {

    public id: string | undefined;
    public id_user: string | undefined;
    public id_role : string | undefined;

    constructor(obj: any) {
        Object.assign(this,obj);
}
}