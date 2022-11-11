import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../../../models/cars/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  index(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.url_backend}/vehicles_car`);
  }

  show(id: string): Observable<Car> {
    return this.http.get<Car[]>(`${environment.url_backend}/vehicles/car/${id}`);
  }

  create(car:Car): any{
    return this.http.post(`${environment.url_backend}/car`, car)

  }

  update(car:Car): any{
    return this.http.put(`${environment.url_backend}/car/${car.id}`, car)
  }

  destroy(id: string) {
    return this.http.delete<Car>(`${environment.url_backend}/vehicles/car/${id}`);
  }
}
