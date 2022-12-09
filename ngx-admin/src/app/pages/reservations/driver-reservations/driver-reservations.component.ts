import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../services/security/security.service';
import { ReservationService } from '../../../services/reservations/reservation.service';
import { DriverService } from '../../../services/users/drivers/driver.service';
import { Reservation } from '../../../models/reservations/reservation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-driver-reservations',
  templateUrl: './driver-reservations.component.html',
  styleUrls: ['./driver-reservations.component.scss']
})
export class DriverReservationsComponent implements OnInit {
  reservations:Reservation[];
  constructor(private securitySvc: SecurityService, private resSvc:ReservationService, private driverService:DriverService, private router:Router) { }

  ngOnInit(): void {
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      let user_id = this.securitySvc.UserSesionActiva.id
      this.driverService.getDriver(user_id).subscribe((data)=>{
        this.resSvc.getReservations(data.id).subscribe((res)=>{
          this.reservations = res
          console.log(res)
        });
      });
    }
  }

  showReservation(reservation_id){
    this.router.navigate([`pages/reservations/show/${reservation_id}`]);
  }

}
