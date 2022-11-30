import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../../models/permissions/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) {}

  index(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.url_backend}/permission`);
  }

  show(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${environment.url_backend}/permission/${id}`);
  }

  create(permission:Permission): any{
    return this.http.post(`${environment.url_backend}/permission`, permission)

  }

  update(permission:Permission): any{
    return this.http.put(`${environment.url_backend}/permission/${permission.id}`, permission)
  }

  destroy(id: string) {
    return this.http.delete<Permission>(`${environment.url_backend}/permission/${id}`);
  }

}


