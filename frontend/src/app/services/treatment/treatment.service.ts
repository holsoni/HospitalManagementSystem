import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Services} from "../../model/services/services";

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/treatment';
  }

  public findAll(): Observable<Services[]> {
    return this.http.get<Services[]>(this.url);
  }

  public create(treatment: any) {
    console.log("Added" + treatment)
    const url = `${this.url}/create`;

    return this.http.post<any>(url, treatment);
  }
  public update(treatment: any) {
    console.log("Added" + treatment)
    const url = `${this.url}/update`;
    return this.http.post<any>(url, treatment);
  }
  getById(id: string): Observable<any> {
    const url = `${this.url}/getById?id=${id}`;
    console.log(url);
    return this.http.get<any>(url);
  }
  delete(id: string): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    console.log(url);
    return this.http.post<any>(url, null);
  }
}
