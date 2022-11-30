import { Role } from '../roles/role.model';
export class User {
    id?:number;
    name?:string;
    email?: string;
    password?: string;
    role_id?:number;
    role?:Role
    //profile:Profile;
    token?:string;
}
