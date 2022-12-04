import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security/security.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverGuard implements CanActivate {

  constructor (private securitySvc: SecurityService, private router: Router){

  } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.securitySvc.sesionExiste() && this.securitySvc.verificarRolSesion(environment.DRIVER_ID)) {
        return true
      }  else {
        this.router.navigate(["pages/security/login"]);
        return false;
      }
  }
  
}
