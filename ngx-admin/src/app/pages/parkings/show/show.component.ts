import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import { SecurityService } from "../../../services/security/security.service";
import { ParkingSpotService } from "../../../services/parkings/parkingSpot/parking-spot.service";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot.model";

@Component({
  selector: 'ngx-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  parking_id: number;
  parking: Parking;
  parking_spots: ParkingSpot[] = [];
  days= [];
  open_hour:Number[] = [];
  end_hour:Number[] = [];

  constructor(private parkingSvc: ParkingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private parkingSpotSvc: ParkingSpotService) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.parking_id = this.activeRoute.snapshot.params.id;
      this.getParking(this.parking_id);
      this.getParkingSpots(this.parking_id);
    } else {
      Swal.fire(
        "Error",
        "Esta acción no se puede realizar",
        "error"
      );
      this.router.navigate(["pages/dashboard"]);
    }
    
  }

  getParking(id: number) {
    this.parkingSvc.show(id).subscribe((data) => {
      this.parking = data;
      this.formatSchedule();
    });
  }

  getParkingSpots(id: number) {
    this.parkingSpotSvc.getAllSpots(id).subscribe((data) => {
      this.parking_spots = data;
      console.log(data);
    });
  }

  formatSchedule(){
    let schedule = JSON.parse(this.parking.open_hours);
    this.days = schedule.days;
    this.days = this.days.map((day)=> {return day.charAt(0).toUpperCase() + day.slice(1); });
    this.open_hour.push(Number(schedule.startTime.hour));
    this.open_hour.push(Number(schedule.startTime.minute));
    this.end_hour.push(Number(schedule.endTime.hour));
    this.end_hour.push(Number(schedule.endTime.minute));
  }

  goBack() {
    window.history.back();
  }

  createReservation(spot_id:number){
    console.log("Reservando lugar", spot_id);
    this.router.navigate([`pages/reservations/create/new/${spot_id}/${-1}`]);
  }

}
