import { Component, OnInit } from "@angular/core";
import { ReservationService } from "../../../services/reservations/reservation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Reservation } from "../../../models/reservations/reservation.model";
import Swal from "sweetalert2";
import { VehicleService } from "../../../services/vehicles/vehicle.service";
import { Vehicle } from "../../../models/vehicles/vehicle.model";
import { ParkingSpotService } from "../../../services/parkings/parkingSpot/parking-spot.service";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import { DriverService } from "../../../services/users/drivers/driver.service";
import { UserService } from "../../../services/users/user.service";
import { environment } from "../../../../environments/environment";
import { SecurityService } from "../../../services/security/security.service";
import { Parking } from "../../../models/parkings/parking.model";
import { User } from "../../../models/users/user.model";

import { Driver } from "../../../models/drivers/driver.model";
@Component({
  selector: "ngx-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent implements OnInit {
  res_id: number;
  reservation: Reservation;
  vehicle: Vehicle;
  spot: ParkingSpot;
  parking: Parking;
  driver: Driver;
  name: string;
  logged_id;

  constructor(
    private resSvc: ReservationService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vehicleSvc: VehicleService,
    private spotSvc: ParkingSpotService,
    private parkingSvc: ParkingService,
    private driverSvc: DriverService,
    private userSvc: UserService,
    private securitySvc: SecurityService
  ) {}

  ngOnInit(): void {
    if (this.securitySvc.sesionExiste()) {
      this.logged_id = JSON.parse(this.securitySvc.getDatosSesion()).id;
    }

    if (this.activeRoute.snapshot.params.id) {
      this.res_id = this.activeRoute.snapshot.params.id;
      this.getReservation(this.res_id);
    } else {
      Swal.fire("Error", "Esta acción no se puede realizar", "error");
      this.router.navigate(["pages/home"]);
    }
  }

  getReservation(id) {
    this.resSvc.show(id).subscribe((data) => {
      this.reservation = data;
      this.getVehicle(data.vehicle_id);
      this.getParking(data.parking_spot_id);
      this.getDriver(data.driver_id);
    });
  }

  getVehicle(id) {
    this.vehicleSvc.show(id).subscribe((data) => {
      this.vehicle = data[0];
    });
  }

  getParking(id) {
    this.spotSvc.show(id).subscribe((data) => {
      this.spot = data;
      this.parkingSvc.show(data.parking_id).subscribe((prk) => {
        this.parking = prk;
      });
    });
  }

  getDriver(id) {
    this.driverSvc.show(id).subscribe((data) => {
      this.driver = data[0];
      this.name = data[0].user.name;
    });
  }

  goBack() {
    window.history.back();
  }

  endReservation(reservation_id) {
    Swal.fire({
      title: "Finalizar reserva",
      text: `Está seguro que quiere finalizar la reserva${this.reservation.id} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.resSvc.finish(reservation_id).subscribe((data) => {
          Swal.fire(
            "Finalizada!",
            "La reserva fue finalizada correctamente",
            "success"
          );
          if (this.securitySvc.verificarRolSesion(environment.DRIVER_ID)) {
            this.router.navigate([
              `pages/ratings/create/-1/${this.parking.id}`,
            ]);
          } else {
            this.ngOnInit();
          }
        });
      }
    });
  }
}
