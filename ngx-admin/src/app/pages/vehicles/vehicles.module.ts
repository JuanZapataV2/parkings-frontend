import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

import { ShowComponent } from './show/show.component';

import { DriverVehiclesComponent } from './driver-vehicles/driver-vehicles.component';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    ShowComponent,
    DriverVehiclesComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule
  ]
})
export class VehiclesModule { }
