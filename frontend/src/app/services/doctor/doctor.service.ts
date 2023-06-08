import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalForm} from "../../model/medical-form/medical-form";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly url: string;

/*###
  GET http://localhost:8080/doctor/getBySpecialization

###
  GET http://localhost:8080/doctor/getByLastNameContains*/

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/doctor';
  }

  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }
  public getBySpecialization(spec:any): Observable<any[]> {
    const url = `${this.url}/getBySpecialization?spec=${spec}`;
    return this.http.get<any[]>(url);
  }
  public getByLastNameContains(lastName:any): Observable<any[]> {
    const url = `${this.url}/getByLastNameContains?lastName=${lastName}`;
    return this.http.get<any[]>(url);
  }
  public getByUserId(id:any): Observable<any> {
    const url = `${this.url}/getByUserId?id=${id.id}`;
    return this.http.get<any>(url);
  }
}
