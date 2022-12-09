import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { DriverReservationsComponent } from './driver-reservations/driver-reservations.component';



@NgModule({
  declarations: [
    ShowComponent,
    ListComponent,
    CreateComponent,
    DriverReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    FormsModule
  ]
})
export class ReservationsModule { }
