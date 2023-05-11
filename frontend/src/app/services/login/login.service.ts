import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Patient} from "../../model/patient/patient";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  public getCurrentUser(){
    return this.http.get(`${this.baseUrl}/current-user`)
  }

  public generateToken(loginData:any){
    let url = `${this.baseUrl}/generate-token`;
    return this.http.post(url,loginData);
  }

  public loginUser(token:any){
    localStorage.setItem("token", token)
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user))
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    console.log(user.authorities[0].authority);
    return user.authorities[0].authority;
  }
}
