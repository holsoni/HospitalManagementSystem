import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
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
  public findById(id:string): Observable<Patient> {
    const url = `${this.url}/getById?id=${id}`;
    return this.http.get<Patient>(url);
  }

  public getAll():Observable<any[]> {
    return this.http.get<any[]>(this.url);
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

  public getPatientFullName(patient:any){
    let firstName = patient.firstName ? patient.firstName : '';
    let lastName = patient.lastName ? patient.lastName : '';
    let fathersName = patient.fathersName ? patient.fathersName : '';

    return `${lastName} ${firstName} ${fathersName}`;
  }

  public getAge(patient: any): number {
    const birthDate = new Date(patient.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed = today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  }



}
