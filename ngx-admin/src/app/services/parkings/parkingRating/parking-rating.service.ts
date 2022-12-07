import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ParkingRating } from '../../../models/parking-ratings/parking-rating.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingRatingService {

  constructor(private http: HttpClient) {}

  index(): Observable<ParkingRating[]> {
    return this.http.get<ParkingRating[]>(`${environment.url_backend}/parkingRating`);
  }

  show(id: number): Observable<ParkingRating> {
    return this.http.get<ParkingRating>(`${environment.url_backend}/parkingRating/${id}`);
  }

  create(parkingRating:ParkingRating): any{
    return this.http.post(`${environment.url_backend}/parkingRating`, parkingRating)

  }

  update(parkingRating:ParkingRating): any{
    return this.http.put(`${environment.url_backend}/parkingRating/${parkingRating.id}`, parkingRating)
  }

  destroy(id: number) {
    return this.http.delete<ParkingRating>(`${environment.url_backend}/parkingRating/${id}`);
  }

}
