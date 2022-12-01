import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
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
    path: "show/:id",
    component: ShowComponent,
  },
  {
    path:'update/:id',
    component: CreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingsRoutingModule {}
