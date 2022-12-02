import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Motorcycle } from '../../../models/motorcycles/motorcycle.model';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  constructor(private http: HttpClient) {}

  index(): Observable<Motorcycle[]> {
    return this.http.get<Motorcycle[]>(`${environment.url_backend}/vehicles_motorcycle`);
  }

  show(id: number): Observable<Motorcycle> {
    return this.http.get<Motorcycle>(`${environment.url_backend}/vehicles/motorcycle/${id}`);
  }

  create(motorcycle:Motorcycle): any{
    return this.http.post(`${environment.url_backend}/vehicles/motorcycle`, motorcycle)

  }

  update(motorcycle:Motorcycle): any{
    return this.http.put(`${environment.url_backend}/vehicles/motorcycle/${motorcycle.id}`, motorcycle)
  }

  destroy(id: number) {
    return this.http.delete<Motorcycle>(`${environment.url_backend}/vehicles/motorcycle/${id}`);
  }
}
