import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingsRoutingModule } from './ratings-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    RatingsRoutingModule,
    FormsModule
  ]
})
export class RatingsModule { }
