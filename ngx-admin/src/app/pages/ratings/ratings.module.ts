import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingsRoutingModule } from './ratings-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    RatingsRoutingModule
  ]
})
export class RatingsModule { }
