import { Driver } from "../drivers/driver.model"

export class Vehicle {
  id? : number
  license_plate : string
  drivers: [Driver]
}
