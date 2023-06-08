import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../services/patient/patient.service";
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../../model/patient/patient";

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit{

  patient:Patient;
  constructor(private patientService:PatientService, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.patientService.findById(id).subscribe(data => {
        this.patient = data;
        console.log(this.patient);
      });
    });
  }


}
