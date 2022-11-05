import { Permission } from "../permissions/permission.model"

export class Role {
  id? : number
  name : string
  permissions : [Permission]
}
