import { ParkingOwner } from "../parking-owners/parking-owner.model"
import { ParkingSpot } from "../parking-spots/parking-spot.model"

export class Parking {
  id?: number
  owner_id: number
  name: string
  address: string
  telephone: string
  number_spaces: number
  open_hours?: string
  parking_owner: ParkingOwner
  parking_spots: [ParkingSpot]

}
