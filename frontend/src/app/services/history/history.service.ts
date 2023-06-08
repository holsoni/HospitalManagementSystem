import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/history';
  }

  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }

  public getById(id:string): Observable<any> {
    const url = `${this.url}/getById?id=${id}`;
    return this.http.get<any>(url);
  }

  public getByMedicalCardId(id:string): Observable<any> {
    const url = `${this.url}/getByMedicalCardId?id=${id}`;
    return this.http.get<any>(url);
  }
  public create(history: any):Observable<any> {
    console.log("Added" + history)
    const url = `${this.url}/addHistory`;
    return this.http.post<any>(url, history);
  }
  public update(history: any):Observable<any> {
    console.log("updated" + history)
    const url = `${this.url}/update`;
    return this.http.post<any>(url, history);
  }
}
