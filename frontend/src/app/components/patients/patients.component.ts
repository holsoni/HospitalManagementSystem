import { Component } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Services} from "../../model/services/services";
import {ProcedureService} from "../../services/procedure/procedure.service";
import {PatientService} from "../../services/patient/patient.service";
import {Patient} from "../../model/patient/patient";
import {Observable} from "rxjs";

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
  dataSource: Patient[];
  phone= new FormControl('');


  constructor(private fb: FormBuilder,private service:PatientService) {
  }


  changeAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch;
  }

  getByPhone(phone:string):void{
    this.service.findAllByPhone(phone).subscribe(data=> {this.dataSource = data});
    console.log(this.dataSource);

  }

  getAdvancedSearch(): void {
    let firstName = this.patientForm.get("firstName")?.value;
    let lastName = this.patientForm.get("lastName")?.value;
    let dateOfBirth = this.patientForm.get("dateOfBirth")?.value;
    this.service.advancedSearch(firstName, lastName, dateOfBirth).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  resetSearch(){
    this.patientForm.reset();
  }



}
