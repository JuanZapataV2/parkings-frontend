import { Component, OnInit } from "@angular/core";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ParkingSpotService } from '../../../services/parkings/parkingSpot/parking-spot.service';
@Component({
  selector: "ngx-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  columns: string[] = ["Id", "Owner", "Name"];
  parkings: Parking[];
  parking_spots:any[];
  constructor(private parkingSvc: ParkingService, private router: Router, private parkingSpotSvc: ParkingSpotService) {}

  ngOnInit(): void {
    this.listParkings();
  }

  listParkings(): void {
    this.parkingSvc.index().subscribe((parkings) => {
      this.parkings = parkings;
    });
  }

  deleteParking(id: number): void {
    this.getParkingSpots(id);
    Swal.fire({
      title: "Eliminar parqueadero",
      text: "Está seguro que quiere eliminar el parqueadero?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (this.parking_spots.length > 0) {
          this.parking_spots.forEach(spot => {
            this.parkingSpotSvc.destroy(spot.id).subscribe((data) => {
              console.log("Lugar eliminado");
            });
          });
        }
        await delay(1000);
        this.parkingSvc.destroy(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El parqueadero ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }

  updateParking(id: number): void {
    this.router.navigate([`pages/parkings/update/${id}`]);
  }

  createParking(): void {
    this.router.navigate(["/pages/parkings/create"]);
  }


  getParkingSpots(id: number) {
    this.parkingSpotSvc.getAllSpots(id).subscribe((data) => {
      this.parking_spots = data;
    });
  }
  showParking(id: number):void{
    this.router.navigate([`pages/parkings/show/${id}`]);
  }

  
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}