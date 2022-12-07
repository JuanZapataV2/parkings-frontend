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
  idVehicleSelected: number;

  idParkingSelected: number;


  vehicles: Vehicle[] = [];
  parkings: Parking[] = [];
  parking: Parking = null;



  constructor(
    private reservationSvc: ReservationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private driverSvc: DriverService,
    private driverVehicleSvc: DriverVehicleService,
    private parkingSvc: ParkingService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id != -1) {
      this.createMode = false;
      this.reservation_id = this.activeRoute.snapshot.params.id;
    } else if (this.activeRoute.snapshot.params.spot_id) {
      this.getReservation(this.reservation_id);
      this.createMode = true;
      this.spot_id = this.activeRoute.snapshot.params.spot_id;
    } else {
      //this.createMode = true;
    }
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      let user_id = this.securitySvc.UserSesionActiva.id;
      this.driverSvc.getDriver(user_id).subscribe((data) => {
        if(data){
          this.driver_id = data.id;
        }
        this.getVehicles();
      });
      this.getParkings();

    }
  }

  create(): void {
    this.sendAttempt = true;
    this.reservation.state = 1;
    this.reservation.driver_id = this.driver_id;
    this.reservation.parking_spot_id = this.spot_id;
    this.reservation.vehicle_id = this.idVehicleSelected;
    if (this.validateData()) {
      this.reservationSvc.create(this.reservation).subscribe((data) => {
        Swal.fire(
          "Creado",
          "La reserva ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/reservations/list"]);
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  update(): void {
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
    console.log("Buscando reserva", id);
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
      this.reservation.driver_id == null ||
      this.reservation.parking_spot_id == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  getVehicles() {
    if (this.driver_id) {
      this.driverVehicleSvc
        .getDriverVehicles(this.driver_id)
        .subscribe((data) => {
          this.vehicles = data;
        });
    }
  }

  getParkings() {
      this.parkingSvc
        .index()
        .subscribe((data) => {
          this.parkings = data;
          console.log(data)
        });
  }

  getParking() {
    if (this.idParkingSelected){
    this.parkingSvc
      .show(this.idParkingSelected)
      .subscribe((data) => {
        this.parking = data;
        console.log(data)
      });
    }
    console.log(this.parking)
  }

  getHoursDiff(startDate, endDate) {
    if(!endDate || !startDate){
      return 0;
    }
    const msInHour = 1000 * 60 * 60;
    startDate = new Date (startDate);
    endDate = new Date (endDate);
    return Math.round(Math.abs(endDate - startDate) / msInHour);
  }

  setPrice(startDate, endDate, vehicleType){
    if (vehicleType && this.parking){
      let hours = this.getHoursDiff(startDate, endDate)
      let price = vehicleType === 1? hours * this.parking.car_hour_price : hours * this.parking.bike_hour_price;
      return price;
    }
    return 0;
  }

  alert(){
    Swal.fire(
      "Prices",
      "Car:"+this.parking.car_hour_price+" --- "+"Motorcycle:"+this.parking.bike_hour_price,
    );
  }
}
