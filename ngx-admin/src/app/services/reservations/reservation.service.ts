import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Reservation } from '../../models/reservations/reservation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  index(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.url_backend}/reservation`);
  }

  show(id: string): Observable<Reservation> {
    return this.http.get<Reservation[]>(`${environment.url_backend}/reservation/${id}`);
  }

  create(reservation:Reservation): any{
    return this.http.post(`${environment.url_backend}/reservation`, reservation)

  }

  update(reservation:Reservation): any{
    return this.http.put(`${environment.url_backend}/reservation/${reservation.id}`, reservation)
  }

  destroy(id: string) {
    return this.http.delete<Reservation>(`${environment.url_backend}/reservation/${id}`);
  }
}
