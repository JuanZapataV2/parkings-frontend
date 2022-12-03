import { NgModule } from '@angular/core';
import { LoginGuard } from '../../guards/login.guard';

import { RouterModule, Routes , CanActivate} from '@angular/router';
import {LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
const routes: Routes = [
  {
    "path": "login",
    "component":LoginComponent,
    canActivate:[LoginGuard],
  },
  {
    "path": "logout",
    "component":LogoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
