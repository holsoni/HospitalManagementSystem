import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/appointments';
  }

  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }
  public getAllByPatientId(id:any,page:number,size:number): Observable<any[]> {
    const url = `${this.url}/getAllByPatientId?id=${id}&page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }
public getAllByDoctorId(id:any): Observable<any[]> {
    const url = `${this.url}/getAllByDoctorId?id=${id}`;
    return this.http.get<any[]>(url);
  }

  public countAllByPatientId(id:any): Observable<number> {
    const url = `${this.url}/countAllByPatientId?id=${id}`;
    return this.http.get<number>(url);
  }

  public create(app:any){
    const url = `${this.url}/create`;
    return this.http.post<any>(url,app);
  }
}
