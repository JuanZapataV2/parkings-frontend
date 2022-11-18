import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Role } from '../../models/roles/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  index(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_backend}/roles`);
  }

  show(id: string): Observable<Role> {
    return this.http.get<Role[]>(`${environment.url_backend}/roles/${id}`);
  }

  create(rol:Role): any{
    return this.http.post(`${environment.url_backend}/rol`, rol)

  }

  update(rol:Role): any{
    return this.http.put(`${environment.url_backend}/rol/${rol.id}`, rol)
  }

  destroy(id: string) {
    return this.http.delete<Role>(`${environment.url_backend}/roles/${id}`);
  }

}
