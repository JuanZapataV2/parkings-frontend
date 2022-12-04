import { Driver } from "../drivers/driver.model"
import { Car } from '../cars/car.model';
import { Motorcycle } from '../motorcycles/motorcycle.model';

export class Vehicle {
  id? : number
  license_plate : string
  drivers: [Driver]
  cars?: [Car]
  motorcycles?: [Motorcycle]
}
