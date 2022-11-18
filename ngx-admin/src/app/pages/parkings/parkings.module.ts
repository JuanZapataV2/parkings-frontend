import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingsRoutingModule } from './parkings-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ParkingsRoutingModule
  ]
})
export class ParkingsModule { }
