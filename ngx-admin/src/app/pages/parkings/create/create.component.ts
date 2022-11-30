import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";

@Component({
  selector: "ngx-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  createMode: boolean = true;
  user_id: number;
  parking: Parking = {
    owner_id: null,
    name: null,
    address: null,
    telephone: null,
    number_spaces: null,
    open_hours: null,
    parking_owner: null,
    parking_spots: null,
  };
  sendAttempt: boolean = false;

  constructor(
    private parkingSvc: ParkingService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.user_id = this.activeRoute.snapshot.params.id;
      this.getUser(this.user_id);
    } else {
      this.createMode = true;
    }
  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.parkingSvc.create(this.parking).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El parqueadero ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/users/list"]);
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
      this.parkingSvc.update(this.parking).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "El parqueadero ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/users/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getUser(id: number) {
    this.parkingSvc.show(id).subscribe((data) => {
      this.parking = data[0];
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.parking.name == "" ||
      this.parking.address == "" ||
      this.parking.number_spaces == null ||
      this.parking.owner_id == null ||
      this.parking.telephone == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
