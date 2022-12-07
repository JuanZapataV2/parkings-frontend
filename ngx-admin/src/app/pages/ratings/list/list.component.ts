import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ParkingRating } from '../../../models/parking-ratings/parking-rating.model';
import { ParkingRatingService } from '../../../services/parkings/parkingRating/parking-rating.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ["Id","Comment","Rating", "User", "Parking"]
  ratings:ParkingRating[];

  constructor(private ratingSvc: ParkingRatingService, private router:Router) { }

  ngOnInit(): void {
    this.listRatings();
  }

  listRatings(): void {
    this.ratingSvc.index().subscribe(ratings =>{
      this.ratings = ratings;
    });
  }

  deleteRating(id:number):void{
    Swal.fire({
      title: 'Eliminar reseña',
      text: "Está seguro que quiere eliminar la reseña?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ratingSvc.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'La reseña ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }


  updateRating(id:number): void {
    // Falta implementar :v
    // console.log("Editando a: ", id);
    // this.ratingSvc.destroy(id).subscribe(ratings =>{
    //   console.log(ratings);
    //   this.ratings = ratings;
    // });
    this.router.navigate([`pages/ratings/update/${id}`]);
  }

  createRating():void{
    this.router.navigate(["/pages/ratings/create"]);
  }

}
