import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Driver } from '../../../models/drivers/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {}

  index(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.url_backend}/users_owner`);
  }

  show(id: string): Observable<Driver> {
    return this.http.get<Driver[]>(`${environment.url_backend}/users/drivers/${id}`);
  }

  create(driver:Driver): any{
    return this.http.post(`${environment.url_backend}/driver`, driver)

  }

  update(driver:Driver): any{
    return this.http.put(`${environment.url_backend}/driver/${driver.id}`, driver)
  }

  destroy(id: string) {
    return this.http.delete<Driver>(`${environment.url_backend}/users/drivers/${id}`);
  }
}