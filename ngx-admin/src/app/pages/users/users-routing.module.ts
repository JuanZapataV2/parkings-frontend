import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { AuthenticatorGuard } from '../../guards/authenticator.guard';
import { AdministratorGuard } from '../../guards/administrator.guard';

const routes: Routes = [
  {
    path: 'list',
    canActivate:[AdministratorGuard, AuthenticatorGuard],
    component: ListComponent
  },
  {
    path:'create',
    component: CreateComponent
  },
  {
    path:'update/:id',
    canActivate:[AdministratorGuard, AuthenticatorGuard],
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
