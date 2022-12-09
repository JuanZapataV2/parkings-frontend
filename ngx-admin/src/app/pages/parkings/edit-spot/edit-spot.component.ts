import { Component, OnInit } from '@angular/core';
import { ParkingSpot } from '../../../models/parking-spots/parking-spot.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingSpotService } from '../../../services/parkings/parkingSpot/parking-spot.service';
import { FormBuilder } from '@angular/forms';
import Swal from "sweetalert2";
@Component({
  selector: 'ngx-edit-spot',
  templateUrl: './edit-spot.component.html',
  styleUrls: ['./edit-spot.component.scss']
})
export class EditSpotComponent implements OnInit {
  spot:ParkingSpot={
    parking_id:null,
    code: null,
    observations:null,
    occupied: null,
  };

  occupied:String;
  constructor(private formBuilder: FormBuilder,private parkingSpotSvc: ParkingSpotService, private router: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.getSpot(this.activeRoute.snapshot.params.id);
    }
  }

  getSpot(id: number) {
    this.parkingSpotSvc.show(id).subscribe((spot) => {
      this.spot = spot;
    });
  }

  update(): void {
    if(this.occupied === "1")
      this.spot.occupied = true;
    else if(this.occupied === "0")
      this.spot.occupied = false;
    if (this.validateData()) {
      this.parkingSpotSvc.update(this.spot).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "El espacio ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/parkings/list"]);
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  validateData(): boolean {
    if (
      this.spot.code == "" ||
      this.spot.occupied == null
    ) {
      return false;
    } else {
      return true;
    }
  }

}
