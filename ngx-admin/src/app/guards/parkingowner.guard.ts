import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security/security.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ParkingownerGuard implements CanActivate {
  constructor (private securitySvc: SecurityService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.securitySvc.sesionExiste() && this.securitySvc.verificarRolSesion(environment.PARKING_OWNER_ID)) {
        return true
      }  else {
        return false;
      }
  }
  
}
