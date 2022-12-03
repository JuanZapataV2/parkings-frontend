import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "list",
    component: ListComponent,
  },
  {
    path:'update/:id',
    component: CreateComponent
  },
  {
    path: "show/:id",
    component: ShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
