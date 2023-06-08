import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BedService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/beds';
  }

  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }

  public getById(id:string): Observable<any> {
    const url = `${this.url}/getById?id=${id}`;
    return this.http.get<any>(url);
  }

  public getAllByFreeIs(free:any): Observable<any> {
    const url = `${this.url}/getAllByFreeIs?free=${free}`;
    return this.http.get<any>(url);
  }
  public create(bed: any):Observable<any> {
    console.log("Added" + bed)
    const url = `${this.url}/create`;
    return this.http.post<any>(url, bed);
  }
  public update(bed: any):Observable<any> {
    console.log("updated" + bed)
    const url = `${this.url}/update`;
    return this.http.post<any>(url, bed);
  }
}
