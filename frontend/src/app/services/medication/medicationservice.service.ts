import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medication} from "../../model/medication";

@Injectable()
export class MedicationserviceService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/catalog/medications';
  }

  public findAll(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.url);
  }

  public save(medication: Medication) {
    console.log("Added" + medication)
    return this.http.post<Medication>(this.url, medication);
  }
  deleteMedication(id: string): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    console.log(url);
    return this.http.post<any>(url, null);
  }

  public findAllByName(name: string | null): Observable<Medication[]> {
    const url = `${this.url}/${name}`;
    return this.http.get<Medication[]>(url);
  }
}
