import { Injectable } from '@angular/core';
import { ParkingOwner } from '../../../models/parking-owners/parking-owner.model';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingOwnerService {

  constructor(private http: HttpClient) {}

  index(): Observable<ParkingOwner[]> {
    return this.http.get<ParkingOwner[]>(`${environment.url_backend}/users_owner`);
  }

  show(id: string): Observable<ParkingOwner> {
    return this.http.get<ParkingOwner[]>(`${environment.url_backend}/users/owners/${id}`);
  }

  create(parkingOwner:ParkingOwner): any{
    return this.http.post(`${environment.url_backend}/parkingOwner`, parkingOwner)

  }

  update(parkingOwner:ParkingOwner): any{
    return this.http.put(`${environment.url_backend}/parkingOwner/${parkingOwner.id}`, parkingOwner)
  }

  destroy(id: string) {
    return this.http.delete<ParkingOwner>(`${environment.url_backend}/users/owners/${id}`);
  }

}
