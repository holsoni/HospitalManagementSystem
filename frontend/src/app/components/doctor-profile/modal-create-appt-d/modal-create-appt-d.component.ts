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
  selector: 'app-modal-create-appt-d',
  templateUrl: './modal-create-appt-d.component.html',
  styleUrls: ['./modal-create-appt-d.component.scss']
})
export class ModalCreateApptDComponent implements OnInit{
  appointmentForm: FormGroup;
  patients:any[] = [];
  filteredPatients: Observable<any[]>;
  minDate = new Date();
  maxDate= new Date().setFullYear(this.minDate.getFullYear());
  doctorId: any;
  patientId:any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalCreateApptDComponent>,
              private patientService:PatientService,
              private doctorsService:DoctorService,
              private loginService:LoginService,
              private appointmentService:AppointmentService,
              private route:ActivatedRoute,
              private fb:FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentType:['', Validators.required],
      patient:['',Validators.required],
      date:['', Validators.required],
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      complaints:['']
    });
  }

  ngOnInit() {
    this.patientService.getAll().subscribe(data =>{
      this.patients = data;
    })
    // @ts-ignore
    this.filteredPatients = this.appointmentForm.get('patient').valueChanges.pipe(
      tap(value => console.log('Input value:', value)),
      map(value => this._filter(value || '' ,this.patients)),
      tap(filteredPatients => console.log('Filtered pati:', filteredPatients))
    );

    this.loginService.getCurrentUser().subscribe(data =>{
      console.log("DATA", data);
      //@ts-ignore
      this.doctorsService.getByUserId(data).subscribe(data1 => {
        this.doctorId = data1.id;
      })
    })
  }

  private _filter(value: string,arr:any[]): any[] {
    const filterValue = value.toLowerCase();
    return arr.filter(option => option.lastName.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let value = this.appointmentForm.value;

    value.patient = {};
    value.patient.id = this.patientId;
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
    this.cancel();
  }
  setPatient(patient:any) {
    this.patientId = patient.id;
    this.appointmentForm.get('patient')?.setValue(this.getPersonFullName(patient));
  }
  getPersonFullName(person:any):string {
    let firstName = person.firstName;
    let lastName = person.lastName;
    let fathersName = person.fathersName;
    return `${lastName} ${firstName} ${fathersName} `;
  }

  cancel() {
    this.dialogRef.close();
  }
}
