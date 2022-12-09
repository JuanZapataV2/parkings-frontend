import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { DriverReservationsComponent } from './driver-reservations/driver-reservations.component';
import { DriverGuard } from '../../guards/driver.guard';
import { AdministratorGuard } from '../../guards/administrator.guard';
import { AuthenticatorGuard } from '../../guards/authenticator.guard';

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "create/new/:id/:parking_id/:spot_id",
    component: CreateComponent,
  },
  {
    path: "list",
    component: ListComponent,
    canActivate:[AdministratorGuard, AuthenticatorGuard],
  },
  {
    path:'update/:id',
    component: CreateComponent
  },
  {
    path: "show/:id",
    component: ShowComponent,
  },
  {
    path: "myReservations",
    component: DriverReservationsComponent,
    canActivate:[DriverGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
