import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/card';
  }

  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }

  public getById(id:string): Observable<any> {
    const url = `${this.url}/getById?id=${id}`;
    return this.http.get<any>(url);
  }
}
