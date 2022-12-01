import { Component, OnInit } from "@angular/core";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  columns: string[] = ["Id", "Owner", "Name"];
  parkings: Parking[];
  constructor(private parkingSvc: ParkingService, private router: Router) {}

  ngOnInit(): void {
    this.listParkings();
  }

  listParkings(): void {
    this.parkingSvc.index().subscribe((parkings) => {
      this.parkings = parkings;
    });
  }

  deleteParking(id: number): void {
    Swal.fire({
      title: "Eliminar parqueadero",
      text: "Está seguro que quiere eliminar el parqueadero?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
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

  showParking(id: number):void{
    this.router.navigate([`pages/parkings/show/${id}`]);
  }
}
