import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Parking } from '../../models/parkings/parking.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private http: HttpClient) {}

  index(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${environment.url_backend}/parking`);
  }

  show(id: number): Observable<Parking> {
    return this.http.get<Parking>(`${environment.url_backend}/parking/${id}`);
  }

  create(parking:Parking): any{
    return this.http.post(`${environment.url_backend}/parking`, parking)

  }

  update(parking:Parking): any{
    return this.http.put(`${environment.url_backend}/parking/${parking.id}`, parking)
  }

  destroy(id: number) {
    return this.http.delete<Parking>(`${environment.url_backend}/parking/${id}`);
  }

}
