import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ParkingsRoutingModule } from './parkings-routing.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    ParkingsRoutingModule,
    FormsModule

  ]
})
export class ParkingsModule { }
