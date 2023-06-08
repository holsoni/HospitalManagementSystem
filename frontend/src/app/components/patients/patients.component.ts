import { Component } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Services} from "../../model/services/services";
import {ProcedureService} from "../../services/procedure/procedure.service";
import {PatientService} from "../../services/patient/patient.service";
import {Patient} from "../../model/patient/patient";
import {Observable} from "rxjs";
import {AppointmentService} from "../../services/appointment/appointment.service";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  patientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    dateOfBirth: [''],
    fathersName: [''],
    id: [''],
    birthCode: ['']
  });
  advancedSearch = false;
  dataSource: any[] = [];
  phone= new FormControl('+380995468220');


  constructor(private fb: FormBuilder,private service:PatientService,
              private appointmentService:AppointmentService) {
  }


  changeAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch;
  }

  getByPhone(phone:string):void{
    this.service.findAllByPhone(phone).subscribe(data=> {this.dataSource = data;
    console.log(this.dataSource)});
    console.log(this.phone.touched)

  }

  getAdvancedSearch(): void {
    let firstName = this.patientForm.get("firstName")?.value;
    let lastName = this.patientForm.get("lastName")?.value;
    let dateOfBirth = this.patientForm.get("dateOfBirth")?.value;
    this.service.advancedSearch(firstName, lastName, dateOfBirth).subscribe(data => {
      this.dataSource = data;
      console.log(data);
    });
  }
  getPatientFullName(patient:any):string {
    return this.service.getPatientFullName(patient);
  }
  getAge(patient:any):string {
    return this.service.getAge(patient) + ' років.';
  }
  getAppointmentsNumber(id:any):string {
    let number ;
   /* this.appointmentService.countAllByPatientId(id).subscribe(data =>{ data != undefined ? number = data: number = 0;
    console.log(data)})*/
    return  number + ' візитів';
  }
  resetSearch(){
    this.patientForm.reset();
  }



}
