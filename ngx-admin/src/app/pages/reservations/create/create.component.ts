import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { SecurityService } from "../../../services/security/security.service";
import { User } from "../../../models/users/user.model";
import { ReservationService } from "../../../services/reservations/reservation.service";
import { Reservation } from "../../../models/reservations/reservation.model";
import { Driver } from "../../../models/drivers/driver.model";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot.model";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
} from "@angular/forms";
import { DriverService } from "../../../services/users/drivers/driver.service";
import { Vehicle } from "../../../models/vehicles/vehicle.model";
import { map } from "rxjs/operators";
import { DriverVehicleService } from "../../../services/driver-vehicle/driver-vehicle.service";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import { ParkingSpotService } from "../../../services/parkings/parkingSpot/parking-spot.service";

@Component({
  selector: "ngx-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  createMode: boolean = true;
  reservation_id: number;

  reservation: Reservation = {
    driver_id: 0,
    parking_spot_id: 0,
    vehicle_id: 0,
    price: 0,
    start_date: undefined,
    end_date: undefined,
    observations: "",
    state: 0,
  };

  sendAttempt: boolean = false;
  user: User;
  driver_id: number;
  spot_id: number;
  state$;
  price: number;

  idVehicleSelected: number;
  idParkingSelected: number;
  idSpotSelected: number;

  vehicles: Vehicle[] = [];
  parkings: Parking[] = [];
  spots: ParkingSpot[] = [];
  spot: ParkingSpot = null;
  parking: Parking = null;

  user_role: string;
  user_id: number;

  constructor(
    private reservationSvc: ReservationService,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private driverSvc: DriverService,
    private driverVehicleSvc: DriverVehicleService,
    private parkingSvc: ParkingService,
    private spotSvc: ParkingSpotService,
    private parkingSpotSvc: ParkingSpotService
  ) {}

  ngOnInit(): void {
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      this.user_role = this.securitySvc.UserSesionActiva.role.name;
      if (
        this.activeRoute.snapshot.params.id != -1 &&
        this.activeRoute.snapshot.params.id
      ) {
        this.createMode = false;
        this.reservation_id = this.activeRoute.snapshot.params.id;
        this.getReservation(this.reservation_id);
      } else if (this.activeRoute.snapshot.params.spot_id) {
        this.getReservation(this.reservation_id);
        this.getParking(this.activeRoute.snapshot.params.parking_id);
        this.createMode = true;
        this.spot_id = this.activeRoute.snapshot.params.spot_id;
      } else {
        this.createMode = true;
      }
      if (this.user_role != "admin") {
        this.user_id = this.securitySvc.UserSesionActiva.id;
        this.driverSvc.getDriver(this.user_id).subscribe((data) => {
          if (data) {
            this.driver_id = data.id;
          }
          this.getVehicles(this.driver_id);
        });
      }
      this.getParkings();
    }
  }

  create(): void {
    this.sendAttempt = true;
    this.reservation.state = 1;
    this.reservation.driver_id = this.user_id;
    this.reservation.parking_spot_id = this.spot_id;
    this.reservation.vehicle_id = this.idVehicleSelected;
    this.reservation.price = this.price;
    this.reservation.parking_spot = this.spot;
    console.log(this.reservation)

    if (this.validateData()) {
      this.reservationSvc.create(this.reservation).subscribe((data) => {
        this.parkingSpotSvc
          .show(this.reservation.parking_spot_id)
          .subscribe((spot) => {
            let r_spot = spot;
            r_spot.occupied = true;
            this.parkingSpotSvc.update(spot).subscribe((data) => {
              Swal.fire(
                "Creado",
                "La reserva ha sido creada correctamente",
                "success"
              );
              this.router.navigate(["pages/reservations/list"]);
            });
          });
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  update(): void {
    this.reservation.driver_id = this.user_id;
    this.reservation.parking_spot_id = this.spot_id;
    this.reservation.vehicle_id = this.idVehicleSelected;
    this.reservation.price = this.price;
    this.reservation.parking_spot = this.spot;
    if (this.validateData()) {
      this.reservationSvc.update(this.reservation).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "La reserva ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/reservations/list"]);
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  getReservation(id: number) {
    this.reservationSvc.show(id).subscribe((data) => {
      this.reservation = data;
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.reservation.driver_id == null ||
      this.reservation.parking_spot_id == null ||
      this.reservation.vehicle_id == null ||
      this.reservation.start_date == null ||
      this.reservation.end_date == null ||
      this.reservation.parking_spot_id == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  getVehicles(driver_id) {
    console.log("bucnado carros de:", driver_id);
    this.driverVehicleSvc.getDriverVehicles(driver_id).subscribe((data) => {
      this.vehicles = data;
    });
  }

  getParkings() {
    this.parkingSvc.index().subscribe((data) => {
      this.parkings = data;
    });
  }

  getParking(id?: number) {
    if (id) {
      this.parkingSvc.show(id).subscribe((data) => {
        this.parking = data;
        this.getSpot();
      });
    } else if (this.idParkingSelected) {
      this.parkingSvc.show(this.idParkingSelected).subscribe((data) => {
        this.parking = data;
        this.getSpots();
      });
    }
  }

  getSpots() {
    this.spotSvc.getAllSpots(this.parking.id).subscribe((data) => {
      this.spots = data;
    });
  }

  getSpot() {
    this.spotSvc.show(this.spot_id).subscribe((data) => {
      this.spot = data;
    });
  }

  getHoursDiff(startDate, endDate) {
    if (!endDate || !startDate) {
      return 0;
    }
    const msInHour = 1000 * 60 * 60;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return Math.round(Math.abs(endDate - startDate) / msInHour);
  }

  setPrice(startDate, endDate, vehicleType) {
    if (vehicleType && this.parking) {
      let hours = this.getHoursDiff(startDate, endDate);
      this.price =
        vehicleType === 1
          ? hours * this.parking.car_hour_price
          : hours * this.parking.bike_hour_price;
      return this.price;
    }
    return 0;
  }

  // alert() {
  //   Swal.fire(
  //     "Prices",
  //     "Car:" +
  //       this.parking.car_hour_price +
  //       " --- " +
  //       "Motorcycle:" +
  //       this.parking.bike_hour_price
  //   );
  // }
}
