import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Services} from "../../model/services/services";
import {Patient} from "../../model/patient/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/patients';
  }

  public findAllByPhone(phone:string): Observable<Patient[]> {
    const url = `${this.url}/search/${phone}`;
    return this.http.get<Patient[]>(url);
  }

 // http://localhost:8080/patients/advancedSearch/{{firstName}}{{lastName}}{{dateOfBirth}}
  public advancedSearch(firstName:any, lastName:any, dateOfBirth:any): Observable<Patient[]> {
    ///advancedSearch?firstName=Ольга&lastName=Матвієнко&dateOfBirth=2020-05-06
    const url = `${this.url}/advancedSearch?firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}`;
    return this.http.get<Patient[]>(url);
  }

}
