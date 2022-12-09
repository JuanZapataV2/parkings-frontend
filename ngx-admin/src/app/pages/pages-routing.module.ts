import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsersModule } from './users/users.module';
import { ParkingsModule } from './parkings/parkings.module';
import { RolesModule } from './roles/roles.module';
import { SecurityModule } from './security/security.module';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'parkings',
      loadChildren: () => import('./parkings/parkings.module')
        .then(m => m.ParkingsModule),
    },
    {
      path: 'vehicles',
      loadChildren: () => import('./vehicles/vehicles.module')
        .then(m => m.VehiclesModule),
    },
    {
      path: 'reservations',
      loadChildren: () => import('./reservations/reservations.module')
        .then(m => m.ReservationsModule),
    },
    {
      path: 'ratings',
      loadChildren: () => import('./ratings/ratings.module')
        .then(m => m.RatingsModule),
    },
    {
      path: 'security',
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./roles/roles.module')
        .then(m => m.RolesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
