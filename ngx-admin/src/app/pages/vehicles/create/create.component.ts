import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Vehicle } from '../../../models/vehicles/vehicle.model';
import { VehicleService } from '../../../services/vehicles/vehicle.service';
import { SecurityService } from '../../../services/security/security.service';
import { Motorcycle } from '../../../models/motorcycles/motorcycle.model';
import { Car } from '../../../models/cars/car.model';
import { CarService } from '../../../services/vehicles/cars/car.service';
import { MotorcycleService } from '../../../services/vehicles/motorcycles/motorcycle.service';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  CARRO = "1";
  MOTO = "2";

  createMode: boolean = true;
  vehicle_id: number;
  vehicle: Vehicle = {
    license_plate: null,
    drivers : null,
  };

  bike: Motorcycle ={
    helmet: '',
    vehicle_id: 0
  }

  car: Car ={
    type: 0,
    vehicle_id: 0
  }

  sendAttempt: boolean = false;
  vehicleType: string;

  constructor(
    private vehicleSvc: VehicleService,
    private carSvc: CarService,
    private bikeSvc: MotorcycleService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.vehicle_id = this.activeRoute.snapshot.params.id;
      this.getVehicle(this.vehicle_id);
    } else {
      this.createMode = true;
    }
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      //this.vehicle.owner_id = this.securitySvc.UserSesionActiva.id;
    }
  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.vehicleSvc.create(this.vehicle).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El vehiculo ha sido creado correctamente",
          "success"
        );
      console.log(this.vehicleType)
        switch (this.vehicleType) {
          case "1":
            console.log("hago carro");
            this.car.vehicle_id = data.id;
            this.carSvc.create(this.car).subscribe((data) => {
                Swal.fire(
                  "Creado",
                  "El carro ha sido creado correctamente",
                  "success"
                );
            });
            break;
          case "2":
            console.log("hago moto");
            this.bike.vehicle_id = data.id;
            this.bikeSvc.create(this.bike).subscribe((data) => {
                Swal.fire(
                  "Creado",
                  "La moto ha sido creado correctamente",
                  "success"
                );
            });
            break;
        }
        //this.router.navigate(["pages/vehicles/list"]);
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
      this.vehicleSvc.update(this.vehicle).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "El vehiculo ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/vehicles/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getVehicle(id: number) {
    this.vehicleSvc.show(id).subscribe((data) => {
      this.vehicle = data;
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.vehicle.license_plate == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
