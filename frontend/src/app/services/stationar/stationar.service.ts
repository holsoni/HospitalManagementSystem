import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medication} from "../../model/medication";
import {MedicalCard} from "../../model/MedicalCard/medical-card";

@Injectable({
  providedIn: 'root'
})
export class StationarService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/stationar';
  }

  public findAll(): Observable<MedicalCard[]> {
    return this.http.get<MedicalCard[]>(this.url);
  }

  public save(card: MedicalCard) {
    console.log("Added" + card)
    const url = `${this.url}/addCard`;
    return this.http.post<Medication>(this.url, card);
  }
  deleteMedication(id: string): Observable<MedicalCard> {
    const url = `${this.url}/deleteCard/${id}`;
    console.log(url);
    return this.http.post<MedicalCard>(url, null);
  }

  public findAllByName(name: string | null): Observable<MedicalCard[]> {
    const url = `${this.url}/searchName?firstName=${name}`;
    return this.http.get<MedicalCard[]>(url);
  }

  public findAllByDoctor(name: string | null): Observable<MedicalCard[]> {
    const url = `${this.url}/searchDoctor?lastName=${name}`;
    return this.http.get<MedicalCard[]>(url);
  }

  public findAllByCondition(condition: string | null): Observable<MedicalCard[]> {
    const url = `${this.url}/searchCondition?condition=${condition}`;
    return this.http.get<MedicalCard[]>(url);
  }
  public getByHospitalized(value:boolean): Observable<MedicalCard[]> {
    const url = `${this.url}/getHospitalized?value=${value}`;
    return this.http.get<MedicalCard[]>(url);
  }

}
