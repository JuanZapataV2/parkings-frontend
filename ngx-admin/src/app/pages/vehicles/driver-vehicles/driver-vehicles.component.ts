import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Car } from '../../../models/cars/car.model';
import { Motorcycle } from '../../../models/motorcycles/motorcycle.model';
import { Vehicle } from '../../../models/vehicles/vehicle.model';
import { CarService } from '../../../services/vehicles/cars/car.service';
import { MotorcycleService } from '../../../services/vehicles/motorcycles/motorcycle.service';
import { VehicleService } from '../../../services/vehicles/vehicle.service';
import { UserService } from '../../../@core/mock/users.service';
import { SecurityService } from '../../../services/security/security.service';
import { DriverVehicleService } from '../../../services/driver-vehicle/driver-vehicle.service';
import { Subscription } from 'rxjs';
import { DriverService } from '../../../services/users/drivers/driver.service';

@Component({
  selector: 'ngx-driver-vehicles',
  templateUrl: './driver-vehicles.component.html',
  styleUrls: ['./driver-vehicles.component.scss']
})
export class DriverVehiclesComponent implements OnInit {
  vehicles: any[];
  cars: Car[];
  bikes: Motorcycle[];

  driver_id: number;

  columns:string[] = ["Id","License Plate"]

  constructor(private vehicleSvc: VehicleService,
    private carSvc: CarService,
    private bikeSvc: MotorcycleService,
    private router:Router,
    private driverVehicleSvc: DriverVehicleService,
    private securitySvc: SecurityService,
    private userService: UserService, 
    private driverService:DriverService, ) { }

  ngOnInit(): void {
    this.cars = [];
    this.bikes = [];
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      let user_id = this.securitySvc.UserSesionActiva.id
      this.driverService.getDriver(user_id).subscribe((data)=>{
        this.driver_id = data.id
        this.vehicles = data.vehicles
        this.clasifyVehicles();
      });
    }
  }

  //Ayuda isa D: esto no me quiere servir y quiero fallecer
  // Gracias :3
  clasifyVehicles(){
    for (let i=0; i<this.vehicles.length; i++) {
      let v = this.vehicleSvc.getByPlate(this.vehicles[i].license_plate).subscribe((data)=>{
        if (data.cars.length  > 0){
          this.cars.push(data.cars[0]);
        } else if (data.motorcycles.length > 0){
          this.bikes.push(data.motorcycles[0]);
        }
      })
    } 
    //this.vehicles = [...this.cars, ...this.bikes];
    console.log(this.cars);
  }

  deleteVehicle(id:number):void{
    Swal.fire({
      title: 'Eliminar vehiculo',
      text: "Está seguro que quiere eliminar el vehiculo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleSvc.destroy(id).
        subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El vehiculo ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }


  updateVehicle(id:number, isCar: number): void {
    this.router.navigate([`pages/vehicles/update/${id}`]);
  }

  createVehicle():void{
    this.router.navigate(["/pages/vehicles/create"]);
  }

}
