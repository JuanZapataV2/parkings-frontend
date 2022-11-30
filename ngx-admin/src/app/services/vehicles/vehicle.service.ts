import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models/vehicles/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {}

  index(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.url_backend}/vehicles`);
  }

  show(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.url_backend}/vehicles/${id}`);
  }

  create(vehicle:Vehicle): any{
    return this.http.post(`${environment.url_backend}/vehicle`, vehicle)

  }

  update(vehicle:Vehicle): any{
    return this.http.put(`${environment.url_backend}/vehicle/${vehicle.id}`, vehicle)
  }

  destroy(id: string) {
    return this.http.delete<Vehicle>(`${environment.url_backend}/vehicles/${id}`);
  }

}
