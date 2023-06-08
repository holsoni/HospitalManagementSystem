import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientService} from "../../../services/patient/patient.service";
import {Patient} from "../../../model/patient/patient";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {mapOneOrManyArgs} from "rxjs/internal/util/mapOneOrManyArgs";
import {DoctorProfileService} from "../../../services/doctor-profile/doctor-profile.service";
import {DoctorService} from "../../../services/doctor/doctor.service";
import {MedicalCard} from "../../../model/MedicalCard/medical-card";
import {StationarService} from "../../../services/stationar/stationar.service";
import {HistoryService} from "../../../services/history/history.service";
import * as uuid from 'uuid';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-modal-createcard',
  templateUrl: './modal-createcard.component.html',
  styleUrls: ['./modal-createcard.component.scss']
})
export class ModalCreatecardComponent implements OnInit{
  patients:Patient[] = [];
  doctors:any[] = [];
  cardForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  patientId:any;
  doctorId: any;
  historyId = uuid.v4();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogRef: MatDialogRef<ModalCreatecardComponent>,
              private patientService:PatientService,
              private doctorsService:DoctorService,
              private stationarService:StationarService,
              private medicalHistoryService:HistoryService,
              private fb:FormBuilder) {
    this.cardForm = this.fb.group({
      id:[uuid.v4()],
      doctor:['', Validators.required],
      patient:['',Validators.required],
      condition:['',Validators.required],
      dateTime:['',Validators.required],
      admission:['',Validators.required]
    });
    const currentDate = new Date().getDate();
    this.minDate = new Date(new Date().getFullYear(),0,1);
    this.maxDate = new Date(new Date().getFullYear(),0, currentDate);
  }
  myControl = new FormControl('');
  filteredPatients: Observable<any[]>;
  filteredDoctors: Observable<any[]>;

  ngOnInit() {
    this.patientService.getAll().subscribe(data =>{
      this.patients = data;
    })
    this.doctorsService.getAll().subscribe(data =>{
      // @ts-ignore
      this.doctors = data;
    })
    console.log(this.cardForm.get('id')?.value);
    // @ts-ignore
    this.filteredDoctors = this.cardForm.get('doctor').valueChanges.pipe(
      tap(value => console.log('Input value:', value)),
      map(value => this._filter(value || '',this.doctors )),
      tap(filteredDoctors => console.log('Filtered doctors:', filteredDoctors))
    );
    // @ts-ignore
    this.filteredPatients = this.cardForm.get('patient').valueChanges.pipe(
      tap(value => console.log('Input value:', value)),
      map(value => this._filter(value || '' ,this.patients)),
      tap(filteredPatients => console.log('Filtered pati:', filteredPatients))
    );

    // @ts-ignore

    this.filteredDoctors.subscribe(data => {console.log("F D:",data)});
  }
  private _filter(value: string,arr:any[]): any[] {
    const filterValue = value.toLowerCase();
    return arr.filter(option => option.lastName.toLowerCase().includes(filterValue));
  }

  getPersonFullName(person:any):string {
    let firstName = person.firstName;
    let lastName = person.lastName;
    let fathersName = person.fathersName;
    return `${lastName} ${firstName} ${fathersName} `;
  }

  onSubmit() {
    let history = {
      id: this.historyId,
      created_at: new Date()
    };

    let value = this.cardForm.value;
    value.patient = {};
    value.patient.id = this.patientId;
    value.doctor = {};
    value.doctor.id = this.doctorId;
    value.medicalHistory = history; // Set the medicalHistory

    console.log("Medical card object:", value);

    this.stationarService.create(value).subscribe(
      cardResponse => {
        console.log("Medical card created:", cardResponse);
        this.cancel();
      },
      cardError => {
        console.error("Error creating medical card:", cardError);
      }
    );
  }




  setPatient(patient:any) {
    this.patientId = patient.id;
    this.cardForm.get('patient')?.setValue(this.getPersonFullName(patient));
  }

  setDoctor(doctor:any) {
    this.doctorId = doctor.id;
    this.cardForm.get('doctor')?.setValue(this.getPersonFullName(doctor));
  }

  cancel() {
    this.dialogRef.close();
  }
}
