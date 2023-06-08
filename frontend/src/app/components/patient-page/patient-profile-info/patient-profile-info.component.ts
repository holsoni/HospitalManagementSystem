import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../../../model/patient/patient";
import {PatientService} from "../../../services/patient/patient.service";

@Component({
  selector: 'app-patient-profile-info',
  templateUrl: './patient-profile-info.component.html',
  styleUrls: ['./patient-profile-info.component.scss']
})
export class PatientProfileInfoComponent implements OnInit{
  patient:any;
  showPhoneTable: boolean = false;
  showEmailTable: boolean = false;


  constructor(private route:ActivatedRoute, private patientService:PatientService) {
  }
  ngOnInit(): void {
    // @ts-ignore
    this.route.parent.params.subscribe(params => {
      const id = params['id'];

      this.patientService.findById(id).subscribe(data => {
        this.patient = data;
      });
    });
  }

  togglePhoneTable(): void {
    this.showPhoneTable = !this.showPhoneTable;
  }

  toggleEmailTable(): void {
    this.showEmailTable = !this.showEmailTable;
  }
}
