import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


import { ParkingsRoutingModule } from './parkings-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ParkingsRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule

  ]
})
export class ParkingsModule { }
