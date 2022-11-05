import { Driver } from "../drivers/driver.model"
import { ParkingSpot } from "../parking-spots/parking-spot.model"

export class Reservation {
    id?: number
    driver_id: number
    parking_spot_id: number
    vehicle_id: number
    price: number
    start_date: Date
    end_date: Date
    observations: string
    state: number
    driver: Driver
    parking_spot: ParkingSpot
}
