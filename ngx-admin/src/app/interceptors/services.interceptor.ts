import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { SecurityService } from "../services/security/security.service";
import { Router } from "@angular/router";
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServicesInterceptor implements HttpInterceptor {
  constructor(public SecuritySvc: SecurityService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //return next.handle(request);
    console.log(this.SecuritySvc.UserSesionActiva.name )
    if (this.SecuritySvc.UserSesionActiva.token != undefined) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.SecuritySvc.UserSesionActiva.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl("/pages/dashboard");
        }
        return throwError(err);
      })
    );
  }
}
