import {Component, Inject, Input, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient/patient";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientService} from "../../../services/patient/patient.service";
import {DoctorService} from "../../../services/doctor/doctor.service";
import {StationarService} from "../../../services/stationar/stationar.service";
import {map, Observable, tap} from "rxjs";
import {DialogData} from "../../stationar/modal-createcard/modal-createcard.component";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {LoginService} from "../../../services/login/login.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modal-create-appointment-component',
  templateUrl: './modal-create-appointment-component.component.html',
  styleUrls: ['./modal-create-appointment-component.component.scss']
})
export class ModalCreateAppointmentComponentComponent implements OnInit{
  appointmentForm: FormGroup;
  minDate = new Date();
  maxDate= new Date().setFullYear(this.minDate.getFullYear());
  doctorId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalCreateAppointmentComponentComponent>,
              private patientService:PatientService,
              private doctorsService:DoctorService,
              private loginService:LoginService,
              private appointmentService:AppointmentService,
              private route:ActivatedRoute,
              private fb:FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentType:['', Validators.required],
      date:['', Validators.required],
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      complaints:['']
    });
  }

  ngOnInit() {
    console.log(this.data.patientId);

     this.loginService.getCurrentUser().subscribe(data =>{
       console.log("DATA", data);

       //@ts-ignore
       this.doctorsService.getByUserId(data).subscribe(data1 => {
         console.log("DATA", data);
         console.log("DATA1", data1);
         this.doctorId = data1.id;
       })
     })
  }

  onSubmit() {
    let value = this.appointmentForm.value;
    value.patient = {};
    value.patient.id = this.data.patientId;
    console.log(this.data.patientId)
    value.doctor = {};
    value.doctor.id = this.doctorId;
    console.log(value.startTime);
    console.log(value.date);
    let combinedDateTime = value.date + ' ' + value.startTime;
    let combinedDateTimeE = value.date + ' ' + value.endTime;
    // Create a new Date object using the combined string
    value.startTime = new Date(combinedDateTime);
    value.endTime = new Date(combinedDateTimeE);
   delete value.date;

   console.log(value);
    this.appointmentService.create(value)
      .subscribe(response => {
        console.log('Added:', response);
        // Handle the response or perform any other actions
      }, error => {
        console.error('Error:', error);
        // Handle the error or display an error message
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
