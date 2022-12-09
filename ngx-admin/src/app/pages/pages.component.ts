import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { SecurityService } from '../services/security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu_items"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu=[];
  menu_items = MENU_ITEMS;
  subscription: Subscription;
  isLogged:boolean = false;
  role_id = 0;
  constructor (private securitySvc: SecurityService, private router: Router){
  }

  ngOnInit(){
    this.subscription = this.securitySvc.getUser().subscribe((data)=>{
      if(data.id){
        this.isLogged = true;
        this.role_id= data.role.id;
      } else {
        this.isLogged = false;
        this.role_id= 0;
      }
    });
    this.updateMenuRole(this.role_id);
  }
  updateMenuRole(id) : void{
    let nameMenuItems:String[]=[];
    if(this.isLogged){
      if(id==environment.ADMIN_ID){
        nameMenuItems=["Users", "Reservations", "Ratings", "Parkings", "Vehicles", "Auth"];
      }else if (id == environment.PARKING_OWNER_ID){
        nameMenuItems=["Reservations", "Ratings", "Parkings"];
      } else if (id == environment.DRIVER_ID){
        nameMenuItems=["Reservations", "Ratings", "Parkings", "Vehicles"];
      } else if (id == 0){
        nameMenuItems=["Auth", "Parkings"]
      }
    }else{
      nameMenuItems=["Auth", "Parkings"]
    }

    // MENU_ITEMS.forEach(actualNameMenuItem => {
    //   if(nameMenuItems.indexOf(actualNameMenuItem.title)){
    //     console.log("añado");
    //     this.menu.push(actualNameMenuItem);
    //   } 
    // });
  }
}
