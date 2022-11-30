import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DriverVehicle } from '../../models/driver-vehicle/driver-vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class DriverVehicleService {

  constructor(private http: HttpClient) {}

  index(): Observable<DriverVehicle[]> {
    return this.http.get<DriverVehicle[]>(`${environment.url_backend}/driver-vehicles`);
  }

  show(id: number): Observable<DriverVehicle> {
    return this.http.get<DriverVehicle>(`${environment.url_backend}/driver-vehicles/${id}`);
  }

  create(driverVehicle:DriverVehicle): any{
    return this.http.post(`${environment.url_backend}/driver-vehicles`, driverVehicle)

  }

  update(driverVehicle:DriverVehicle): any{
    return this.http.put(`${environment.url_backend}/driver-vehicles/${driverVehicle.id}`, driverVehicle)
  }

  destroy(id: string) {
    return this.http.delete<DriverVehicle>(`${environment.url_backend}/driver-vehicles/${id}`);
  }
}
