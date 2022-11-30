import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../../../models/parking-spots/parking-spot.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {

  constructor(private http: HttpClient) {}

  index(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(`${environment.url_backend}/parkingSpot`);
  }

  show(id: number): Observable<ParkingSpot> {
    return this.http.get<ParkingSpot>(`${environment.url_backend}/parkingSpot/${id}`);
  }

  create(parkingSpot:ParkingSpot): any{
    return this.http.post(`${environment.url_backend}/parkingSpot`, parkingSpot)

  }

  update(parkingSpot:ParkingSpot): any{
    return this.http.put(`${environment.url_backend}/parkingSpot/${parkingSpot.id}`, parkingSpot)
  }

  destroy(id: string) {
    return this.http.delete<ParkingSpot>(`${environment.url_backend}/parkingSpot/${id}`);
  }
}
