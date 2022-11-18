import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Parking } from '../../../models/parkings/parking.model';
import { ParkingService } from '../../../services/parkings/parking.service';


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columns:string[] = ["Id","OwnerId","Name", "Address", "Telephone", "Number Spaces", "Open Hours", "Parking Owner"]

  parkings:Parking[];


  constructor(private parkingSvc: ParkingService, private router:Router) { }

  ngOnInit(): void {
    this.listParkings();
  }

  listParkings(): void {
    this.parkingSvc.index().subscribe(parkings =>{
      this.parkings = parkings;
    });
  }

  deleteParking(id:number):void{
    Swal.fire({
      title: 'Eliminar parqueadero',
      text: "Está seguro que quiere eliminar el parqueadero?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.parkingSvc.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El parqueader ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }


  updateParking(id:number): void {
    // Falta implementar :v
    // console.log("Editando a: ", id);
    // this.parkingSvc.destroy(id).subscribe(parkings =>{
    //   console.log(parkings);
    //   this.parkings = parkings;
    // });
    this.router.navigate([`pages/parkings/update/${id}`]);
  }

  createParking():void{
    this.router.navigate(["/pages/parkings/create"]);
  }



}
