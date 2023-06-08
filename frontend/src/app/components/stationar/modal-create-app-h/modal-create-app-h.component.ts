import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientService} from "../../../services/patient/patient.service";
import {DoctorService} from "../../../services/doctor/doctor.service";
import {LoginService} from "../../../services/login/login.service";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-modal-create-app-h',
  templateUrl: './modal-create-app-h.component.html',
  styleUrls: ['./modal-create-app-h.component.scss']
})
export class ModalCreateAppHComponent implements OnInit{
  appointmentForm: FormGroup;
  minDate = new Date();
  maxDate= new Date().setFullYear(this.minDate.getFullYear());
  doctorId: any;
  filteredDoctors: Observable<any[]>;
  doctors:any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalCreateAppHComponent>,
              private patientService:PatientService,
              private doctorsService:DoctorService,
              private loginService:LoginService,
              private appointmentService:AppointmentService,
              private route:ActivatedRoute,
              private fb:FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentType:['', Validators.required],
      doctor:['', Validators.required],
      date:['', Validators.required],
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      complaints:['']
    });
  }

  ngOnInit() {
      //@ts-ignore
      this.doctorsService.getAll().subscribe(data =>{
        // @ts-ignore
        this.doctors = data;
      })
      // @ts-ignore
      this.filteredDoctors = this.appointmentForm.get('doctor').valueChanges.pipe(
        tap(value => console.log('Input value:', value)),
        map(value => this._filter(value || '',this.doctors )),
        tap(filteredDoctors => console.log('Filtered doctors:', filteredDoctors))
      );
      console.log(this.data)

  }

  private _filter(value: string,arr:any[]): any[] {
    const filterValue = value.toLowerCase();
    return arr.filter(option => option.lastName.toLowerCase().includes(filterValue));
  }
  onSubmit() {
    let value = this.appointmentForm.value;
    value.patient = {};
    value.doctor = {id:value.doctor.id};
    value.patient.id = this.data.card.patient.id;
    console.log(value.startTime);
    console.log(value.date);
    let combinedDateTime = value.date + ' ' + value.startTime;
    let combinedDateTimeE = value.date + ' ' + value.endTime;
    // Create a new Date object using the combined string
    value.startTime = new Date(combinedDateTime);
    value.endTime = new Date(combinedDateTimeE);
    value.medicalCard = {};
    value.medicalCard.id = this.data.card.id;
    delete value.date;

    console.log( this.data.card.id);
    this.appointmentService.create(value)
      .subscribe(response => {
        console.log('Added:', response);
        // Handle the response or perform any other actions
      }, error => {
        console.error('Error:', error);
        console.log(value);
        // Handle the error or display an error message
      });
  }
  getPersonFullName(person:any):string {
    let firstName = person.firstName;
    let lastName = person.lastName;
    let fathersName = person.fathersName;
    return `${lastName} ${firstName} ${fathersName} `;
  }
  setDoctor(doctor:any) {
    this.doctorId = doctor.id;
    this.appointmentForm.get('doctor')?.setValue(this.getPersonFullName(doctor));
  }

  cancel() {
    this.dialogRef.close();
  }


}
