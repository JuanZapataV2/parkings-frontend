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
import { DriverService } from '../../../services/users/drivers/driver.service';
import { DriverVehicleService } from '../../../services/driver-vehicle/driver-vehicle.service';
import {DriverVehicle} from '../../../models/driver-vehicle/driver-vehicle.model';


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

  updateVehicle: any = {

  }

  sendAttempt: boolean = false;
  vehicleType: string;
  owner_id: string;
  driver_id : number;

  constructor(
    private vehicleSvc: VehicleService,
    private driverSvc: DriverService,
    private carSvc: CarService,
    private bikeSvc: MotorcycleService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private driverVehicleSvc:DriverVehicleService
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
      this.owner_id = this.securitySvc.UserSesionActiva.role.name;
      let user_id = this.securitySvc.UserSesionActiva.id
      if(this.owner_id != "admin"){
        this.driverSvc.getDriver(user_id).subscribe((data)=>{
          this.driver_id = data.id
        });
      }
    }


  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.driverSvc.show(this.driver_id).subscribe((data) => {
        this.vehicle.drivers = [data];
      });
      this.vehicleSvc.create(this.vehicle).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El vehiculo ha sido creado correctamente",
          "success"
        );
        let driver_vehicle:any = {
          "vehicle_id":data.id,
          "driver_id": this.driver_id,
        }
        this.driverVehicleSvc.create(driver_vehicle).subscribe((data) => {
          console.log("Vehiculo creado");
        });
        switch (this.vehicleType) {
          case "1":
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
        window.history.back();
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
    // this.vehicleSvc.show(id).subscribe((data) => {
    //   this.vehicle = data;
    // });
    this.carSvc.show(id).subscribe(cars =>{
      this.car = cars[0];
    });

    this.bikeSvc.show(id).subscribe(bikes =>{
      this.bike = bikes[0];
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    console.log("this.vehicle.license_plate", this.vehicle.license_plate)
    if ( this.vehicle.license_plate == null) {
      return false;
    } else {
      return true;
    }
  }
}
