import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { SecurityService } from "../../../services/security/security.service";
import { User } from "../../../models/users/user.model";
import { ReservationService } from '../../../services/reservations/reservation.service';
import { Reservation } from '../../../models/reservations/reservation.model';
import { Driver } from '../../../models/drivers/driver.model';
import { ParkingSpot } from '../../../models/parking-spots/parking-spot.model';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
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
    observations: '',
    state: 0,
    driver: null,
    parking_spot: null
  };
  sendAttempt: boolean = false;
  user: User;

  constructor(
    private reservationSvc: ReservationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.reservation_id = this.activeRoute.snapshot.params.id;
      this.getRating(this.reservation_id);
    } else {
      this.createMode = true;
    }
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      this.user = this.securitySvc.UserSesionActiva
    }
  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.reservationSvc.create(this.reservation).subscribe((data) => {
        Swal.fire(
          "Creado",
          "La reserva ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/reservations/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );

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
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getRating(id: number) {
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
      this.reservation.price == null ||
      this.reservation.start_date == null ||
      this.reservation.end_date == null ||
      this.reservation.driver == null ||
      this.reservation.parking_spot == null
    ) {
      return false;
    } else {
      return true;
    }
  }

}
