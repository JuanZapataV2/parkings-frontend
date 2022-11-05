import { Role } from "../roles/role.model"

export class Permission {
  id?: number
  url: string
  method: string
  roles: [Role]
}
