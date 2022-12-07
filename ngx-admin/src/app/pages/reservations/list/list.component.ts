import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservations/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../../services/security/security.service';
import { DriverService } from '../../../services/users/drivers/driver.service';
import { DriverVehicleService } from '../../../services/driver-vehicle/driver-vehicle.service';
import { Reservation } from '../../../models/reservations/reservation.model';
import { ParkingService } from '../../../services/parkings/parking.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  reservations:any[]=[];
  parking_name;
  constructor(
    private reservationSvc: ReservationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private driverSvc: DriverService,
    private driverVehicleSvc: DriverVehicleService, 
    private parkingSvc: ParkingService,
  ){}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationSvc.index().subscribe((reservations) => {
      this.reservations = reservations;
      console.log(this.reservations[0]);
    });
  }
  
  getParkingName(parking_id){
    this.parkingSvc.show(parking_id).subscribe((parking) => {
      return parking.name;
    });
  }
}
