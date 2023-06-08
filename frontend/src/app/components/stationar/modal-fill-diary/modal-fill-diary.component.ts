import {Component, Inject} from '@angular/core';
import {Patient} from "../../../model/patient/patient";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import * as uuid from "uuid";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientService} from "../../../services/patient/patient.service";
import {DoctorService} from "../../../services/doctor/doctor.service";
import {StationarService} from "../../../services/stationar/stationar.service";
import {HistoryService} from "../../../services/history/history.service";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-modal-fill-diary',
  templateUrl: './modal-fill-diary.component.html',
  styleUrls: ['./modal-fill-diary.component.scss']
})
export class ModalFillDiaryComponent {

  diaryForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  historyId = uuid.v4();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalFillDiaryComponent>,
              private stationarService:StationarService,
              private fb:FormBuilder) {
    this.diaryForm = this.fb.group({
      id:[uuid.v4()],
      state:['',Validators.required],
      stateDescription:['',Validators.required],
      treatment:['',Validators.required],
      date: ['', [Validators.required, this.dateTakenValidator(this.data.card.diarySet)]],
      pressureTop:['',Validators.required],
      pressureBottom:['',Validators.required],
      pulse:['',Validators.required],
      saturation:['',Validators.required],
      temperature:['',Validators.required],
    });
   // Add 7 days to the minimum date
  }


  ngOnInit() {
    this.minDate = new Date(this.data.card.dateTime);
    console.log(this.data.card)
    console.log(this.minDate.getFullYear());
    console.log(this.minDate.getMonth());
    console.log(this.minDate.getDate());
    this.maxDate = new Date(this.minDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    const currentYear = new Date();

    this.maxDate = new Date(currentYear.getFullYear(), currentYear.getMonth(), currentYear.getDate()+7);
  }



  onSubmit() {
    console.log(this.diaryForm.value);
    this.stationarService.createDiary(this.diaryForm.value).subscribe(response =>{
      console.log(response);
      this.stationarService.update(this.editCardObject(response)).subscribe(repsonse =>{
        console.log(repsonse);
      })
    })
    this.dialogRef.close();
  }


   dateTakenValidator(diarySet: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = control.value ? new Date(control.value) : null;

      if (selectedDate) {
        const isDateTaken = diarySet.some(diary => {
          const diaryDate = new Date(diary.date);
          return diaryDate.toDateString() === selectedDate.toDateString();
        });

        if (isDateTaken) {
          return { dateTaken: true };
        }
      }

      return null;
    };
  }

  editCardObject(diary:any): any {
    let card = this.data.card;
    let patient,doctor,history;
    doctor = card.doctor.id;
    patient = card.patient.id;
    card.doctor = {id:doctor};
    card.patient = {id:patient};
    card.medicalHistory = {id:history};
    let diaries = [];
    diaries = card.diarySet;
    diaries.push(diary); // Use push() instead of add() to add an element to the array
    card.diarySet = diaries;
    console.log("Diaries: ", diaries);
    console.log(card);
    return card;
  }

  cancel() {
    this.dialogRef.close();
  }
}
