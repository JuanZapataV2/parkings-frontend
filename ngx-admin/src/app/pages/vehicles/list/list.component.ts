import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Car } from '../../../models/cars/car.model';
import { Motorcycle } from '../../../models/motorcycles/motorcycle.model';
import { Vehicle } from '../../../models/vehicles/vehicle.model';
import { CarService } from '../../../services/vehicles/cars/car.service';
import { MotorcycleService } from '../../../services/vehicles/motorcycles/motorcycle.service';
import { VehicleService } from '../../../services/vehicles/vehicle.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columns:string[] = ["Id","License Plate","Helmet Number","Vehicle type","Type"]
  vehicles: any[];
  vehiclesBP: Vehicle[];
  cars: Car[];
  bikes: Motorcycle[];

  PUBLIC = "1";
  PRIVATE = "2";


  constructor(
    private vehicleSvc: VehicleService,
    private carSvc: CarService,
    private bikeSvc: MotorcycleService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.getVehicles();
    this.listVehicles();
  }

  listVehicles(): void {
    this.vehicleSvc.index().subscribe(vehicles =>{
      this.vehiclesBP = vehicles;
      console.log(this.vehiclesBP)
    });
  }

  getVehicles(): void {
    this.carSvc.index().subscribe(cars =>{
    this.cars = cars;

    this.bikeSvc.index().subscribe(bikes =>{
      this.bikes = bikes;
      this.vehicles = [...this.cars, ...this.bikes];
      console.log(this.vehicles)
      });
    });
  }

  deleteVehicle(id:number, isCar: number):void{
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
        if(isCar){
          this.bikeSvc.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El vehiculo ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
        }
        this.carSvc.destroy(id).
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
    // Falta implementar :v
    // console.log("Editando a: ", id);
    // this.userSvc.destroy(id).subscribe(vehicles =>{
    //   console.log(vehicles);
    //   this.vehicles = vehicles;
    // });
    this.router.navigate([`pages/vehicles/update/${id}`]);
  }

  createVehicle():void{
    this.router.navigate(["/pages/vehicles/create"]);
  }

}
