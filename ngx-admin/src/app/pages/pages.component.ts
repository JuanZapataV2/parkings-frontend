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
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  subscription: Subscription;
  isLogged:boolean = false;
  constructor (private securitySvc: SecurityService, private router: Router){

  }

  ngOnInit(){
    this.subscription = this.securitySvc.getUser().subscribe((data)=>{
      this.isLogged = true;
      
      this.updateMenuRole(JSON.parse(this.securitySvc.getDatosSesion()).role.id);
    });
  }
  updateMenuRole(id) : void{
    let nameMenuItems:String[];
    if(this.isLogged){
      if(id==environment.ADMIN_ID){
        nameMenuItems=["home","menu","user-management","roles-management","categories-management"];
      }else{
        nameMenuItems=["home","menu","categories-management"];
      }
    }else{
      nameMenuItems=["home"]
    }

    MENU_ITEMS.forEach(actualNameMenuItem => {
      if(nameMenuItems.indexOf(actualNameMenuItem.title)!=-1){
        this.menu.push(actualNameMenuItem);
        
      }
    });
  }
  getItemsMenuRole(menuItems): String[]{
    let items:String[]=[]
    if(this.isLogged){
      menuItems.forEach(itemActual => {
        items.push(itemActual.url);
      });
    }
    
    return items;
  }
}
