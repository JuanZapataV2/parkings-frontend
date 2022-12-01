import { Parking } from "../parkings/parking.model"

export class ParkingSpot {
  id?: number
  parking_id: number
  occupied: boolean
  code: string
  observations?: string
  parking?: Parking
}
