import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {User} from '../../models/users/user.model';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  index(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_backend}/users`);
  }
  destroy(id: string) {
    return this.http.delete<User>(`${environment.url_backend}/users/${id}`);
  }
  create(user:User):any{
    return this.http.post(`${environment.url_backend}/register`, user);
  }
  update(user:User):any{
    return this.http.put(`${environment.url_backend}/users/${user.id}`, user);
  }

  show(id:number):Observable<User>{
    return this.http.get<User>(`${environment.url_backend}/users/${id}`);
  }
}
