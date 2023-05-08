import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    console.log("Added" + user)
    return this.http.post<User>(this.usersUrl, user);
  }
  deleteUser(id: string): Observable<any> {
    const url = `${this.usersUrl}/delete/${id}`;
    console.log(url);
    return this.http.post<any>(url, null);
  }
}
