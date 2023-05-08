import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalForm} from "../../model/medical-form/medical-form";

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/doctorProfile';
  }

  public getAllMedicalForms(): Observable<MedicalForm[]> {
    const url = `${this.url}/medicalForms/getAll`;
    return this.http.get<MedicalForm[]>(url);
  }
}
