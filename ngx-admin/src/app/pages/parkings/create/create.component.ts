import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Parking } from '../../../models/parkings/parking.model';
import { ParkingService } from '../../../services/parkings/parking.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ParkingOwnerService } from '../../../services/users/parkingOwners/parking-owner.service';
import { ParkingOwner } from '../../../models/parking-owners/parking-owner.model';



@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createMode: boolean = true;
  parking_id: number;
  parking: Parking = {
    owner_id: null,
    name: "",
    address: "",
    telephone: "",
    number_spaces: null,
    parking_spots: null,
    open_hours: null,
    parking_owner: null,
  };
  parkingOwners: [ParkingOwner];
  sendAttempt: boolean = false;

  constructor(
    private parkingSvc: ParkingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private parkingOwnSvc: ParkingOwnerService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.parking_id = this.activeRoute.snapshot.params.id;
      this.getParking(this.parking_id);
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
        this.router.navigate(["pages/parkings/list"]);
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
        this.router.navigate(["pages/parkings/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getParking(id: number) {
    this.parkingSvc.show(id).subscribe((data) => {
      this.parking = data[0];
    });
  }

  getParkingOwners(id: number) {
    this.parkingOwnSvc.index().subscribe((data) => {
      this.parkingOwners = data;
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.parking.name == "" ||
      this.parking.address == "" ||
      this.parking.owner_id == null ||
      this.parking.address == "" ||
      this.parking.telephone == "" ||
      this.parking.number_spaces == null ||
      this.parking.parking_owner == null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
