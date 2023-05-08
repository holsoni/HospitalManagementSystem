import {Component, OnInit} from '@angular/core';
import {DoctorProfileService} from "../../../services/doctor-profile/doctor-profile.service";
import {MedicalForm} from "../../../model/medical-form/medical-form";

@Component({
  selector: 'app-medical-forms',
  templateUrl: './medical-forms.component.html',
  styleUrls: ['./medical-forms.component.scss']
})
export class MedicalFormsComponent implements OnInit{
  servColumns: string[] = [ 'name', 'acts'];
  dataSource:MedicalForm[];
  constructor(private service:DoctorProfileService) {
  }

  ngOnInit(){
    this.getAll();
  }
  getAll():void{
    this.service.getAllMedicalForms().subscribe(data=> {this.dataSource = data});
    console.log(this.dataSource);
  }
}
