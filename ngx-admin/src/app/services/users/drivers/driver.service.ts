import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
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

  show(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${environment.url_backend}/users/drivers/${id}`);
  }

  getDriver(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_backend}/users/drivers/getDriver/${id}`);
  }

  create(driver:Driver): any{
    return this.http.post(`${environment.url_backend}/users/drivers`, driver)

  }

  update(driver:Driver): any{
    return this.http.put(`${environment.url_backend}/driver/${driver.id}`, driver)
  }

  destroy(id: number) {
    return this.http.delete<Driver>(`${environment.url_backend}/users/drivers/${id}`);
  }
}
