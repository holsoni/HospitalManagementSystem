import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medication} from "../../model/medication";
import {Services} from "../../model/services/services";

@Injectable()
export class ProcedureService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/catalog/procedures';
  }

  public findAll(): Observable<Services[]> {
    return this.http.get<Services[]>(this.url);
  }

  public save(procedure: Services) {
    console.log("Added" + procedure)
    return this.http.post<Services>(this.url, procedure);
  }
  deleteProcedure(id: string): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    console.log(url);
    return this.http.post<any>(url, null);
  }
}
