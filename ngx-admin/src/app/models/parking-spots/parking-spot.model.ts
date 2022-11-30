import { Parking } from "../parkings/parking.model"

export class ParkingSpot {
  id?: number
  parking_id: number
  code: string
  observations?: string
  parking?: Parking
}
