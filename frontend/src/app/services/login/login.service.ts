import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Patient} from "../../model/patient/patient";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public sessionId:string;
  isLoggedIn = false;
  redirectUrl: string | null = null;
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/login';
  }

  getSessionId(){
    return this.sessionId;
  }
  public login(user: any): Observable<string> {
    return this.http.post<any>(this.url, user).pipe(
      tap(res => {
        if (res && res.sessionId) {
          this.sessionId = res.sessionId;
          sessionStorage.setItem('token', res.sessionId);
        } else {
          throw new Error('Authentication failed');
        }
        this.isLoggedIn = true;
      }),
      map(() => this.sessionId)
    );
  }

}
