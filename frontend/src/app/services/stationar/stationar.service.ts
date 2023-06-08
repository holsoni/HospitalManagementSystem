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


  public findAll(page:number,size:number): Observable<any[]> {
    const url = `${this.url}?page=${page}&size=${size}`;
    console.log(page,size)
    return this.http.get<any[]>(url);
  }
  public getAll(): Observable<any[]> {
    const url = `${this.url}/getAll`;
    return this.http.get<any[]>(url);
  }
  public getAllCurrentTreatment(page:number,size:number): Observable<any[]> {
    const url = `${this.url}/getAllCurrentTreatment?page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }
  public getAllDiagnosis(): Observable<any[]> {
    const url = `${this.url}/diagnosis/getAll`;
    return this.http.get<any[]>(url);
  }
  public getById(id:string): Observable<any> {
    const url = `${this.url}/getById?id=${id}`;
    return this.http.get<any>(url);
  }
  public getAllByPatientId(id:any,page:number,size:number): Observable<any[]> {
    const url = `${this.url}/getAllByPatientId?id=${id}&page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }

  public create(card: any):Observable<any> {
    console.log("Added" + card)
    const url = `${this.url}/addCard`;
    return this.http.post<any>(url, card);
  }
  public createDiary(diary: any):Observable<any> {
    console.log("Added" + diary)
    const url = `${this.url}/addDiary`;
    return this.http.post<any>(url, diary);
  }
  public update(card: any):Observable<any> {
    const url = `${this.url}/update`;
    return this.http.post<any>(url, card);
  }
  public updateFilledHistory(id: any,value:boolean):Observable<any> {
    const url = `${this.url}/updateFilledHistory?id=${id}&value=${value}`;
    return this.http.post<any>(url,null);
  }
  public updateCancelTreatment(id: any,value:boolean):Observable<any> {
    const url = `${this.url}/updateCancelTreatment?id=${id}&value=${value}`;
    return this.http.post<any>(url,null);
  }
  public delete(id: any):Observable<any> {
    const url = `${this.url}/deleteCard?id=${id}`;
    return this.http.delete<any>(url);
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
