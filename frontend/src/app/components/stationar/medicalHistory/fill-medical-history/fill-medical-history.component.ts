import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CardService} from "../../../../services/card/card.service";
import {HistoryService} from "../../../../services/history/history.service";
import {StationarService} from "../../../../services/stationar/stationar.service";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MedicationserviceService} from "../../../../services/medication/medicationservice.service";
import {ProcedureService} from "../../../../services/procedure/procedure.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalFillDiaryComponent} from "../../modal-fill-diary/modal-fill-diary.component";
import * as uuid from 'uuid';
import {TreatmentService} from "../../../../services/treatment/treatment.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-fill-medical-history',
  templateUrl: './fill-medical-history.component.html',
  styleUrls: ['./fill-medical-history.component.scss']
})
export class FillMedicalHistoryComponent implements OnInit{
  displayedColDiaries: string[] = ['date', 'state', 'stateDescription', 'treatment'];
  card:any = {};
  historyForm:any;
  treatmentForm:any;
  public medicationList:any;
  proceduresList:any;
  diagnosisList:any;



  constructor(private route: ActivatedRoute,
              private medicationService:MedicationserviceService,
              private historyService:HistoryService,
              private procedureService:ProcedureService,
              private stationarService:StationarService,
              private treatmentService:TreatmentService,
              private dialog:MatDialog,
              private fb:FormBuilder) {
    this.historyForm = fb.group({
        symptoms: ['',],
        diagnosis:[''],
      efficiencyPaperNumber: ['', [Validators.pattern(/^[А-ЩЬЮЯЇІЄҐ]{2}\d{6}$/)]],
        efficiencyPaperStartDate:[''],
        efficiencyPaperEndDate:[''],
        efficiency:[''],
        treatmentResult:[''],
        additionalDiagnosis:[''],
      procedures:this.fb.array([]),
      medications:this.fb.array([]),
      isMedicalHistoryFilled:[false]
    });

  }

  ngOnInit() {
    console.log(this.card);
    this.historyForm.patchValue(this.card.medicalHistory);
    this.medicationService.findAll().subscribe(data =>{
    this.medicationList = data;
      console.log(data)});


    this.procedureService.findAll().subscribe(data =>{
      this.proceduresList = data});

    this.stationarService.getAllDiagnosis().subscribe(data =>{
      this.diagnosisList = data;
    })

    this.route.queryParams.subscribe(params => {
      let cardId = params['cardId'];
      this.stationarService.getById(cardId).subscribe(data => {
        this.card = data;
        this.historyForm.patchValue(this.card.medicalHistory);
        this.medications.patchValue(this.card.medications);
        let med = this.card.medicalHistory.treatment.medications;

        this.getTreatment();
        let comment = this.getEfficiencyInfo(this.card.medicalHistory.efficiencyComments);

        if (comment != null) {
          this.historyForm.get('efficiencyPaperNumber').setValue(comment.number);
          this.historyForm.get('efficiencyPaperStartDate').setValue(comment.start);
          this.historyForm.get('efficiencyPaperEndDate').setValue(comment.end);
        }
        let matchingDiagnosis = this.diagnosisList.find((option: any) => option.id === this.card.medicalHistory.diagnosis.id);
        this.historyForm.get('diagnosis').setValue(matchingDiagnosis);
        this.card.medicalHistory.treatment.procedures.forEach((procedure: any, index: number) => {
          this.addProcedure();
          let procedureControl = this.procedures.at(index);
          let matchingOption = this.proceduresList.find((option: any) => option.id === procedure.id);
          procedureControl.patchValue(matchingOption);
        });

        this.card.medicalHistory.treatment.medications.forEach((medication: any, index: number) => {
          this.addMedication();
          let medicationControl = this.medications.at(index);
          let matchingOption = this.medicationList.find((option: any) => option.id === medication.id);
          medicationControl.patchValue(matchingOption);
        });

      })
    });


  }

  private _filter(value: string,arr:any[]): any[] {
    const filterValue = value.toLowerCase();
    return arr.filter(option => option.lastName.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.getTreatment().pipe(
      switchMap(treatment => this.treatmentService.update(treatment))
    ).subscribe((response: any) => {
      console.log("treatment", response);
      this.historyService.update(this.getFilledHistory(response)).subscribe(response1 => {
        console.log(response1);
        if(this.historyForm.get('isMedicalHistoryFilled').value == true){
          this.stationarService.updateFilledHistory(this.card.id,true).subscribe(response => {
            console.log("GOOOD");
          })
        }
      });
    });
  }



  getTreatment(): any {
    return this.treatmentService.getById(this.card.medicalHistory.treatment.id).pipe(
      switchMap(response => {
        if (response != null) {
          console.log("not null");
          response.medications = this.historyForm.get('medications').value;
          response.procedures = this.historyForm.get('procedures').value;
          return of(response);
        } else {
          let treatment:any;
          treatment.medications = this.historyForm.get('medications').value;
          treatment.procedures = this.historyForm.get('procedures').value;
          treatment.id = uuid.v4();
          console.log("creating new treatment");
          return of(treatment);
        }
      })
    );
  }

  getFilledHistory(treatment:any):any {
    let history = this.historyForm.value;
    history.id = this.card.medicalHistory.id;
    history.efficiencyComments = this.efficiencyCard();
    history.treatment = treatment;
    return history;
  }

  efficiencyCard():any{
    if(this.historyForm.get('efficiencyPaperNumber').value != null){
      let str = '';
      str = this.historyForm.get('efficiencyPaperNumber').value + " " +
        this.historyForm.get('efficiencyPaperStartDate').value.toString() + " " +
        this.historyForm.get('efficiencyPaperEndDate').value.toString();
      return str;
    }
    return null;
  }
  getEfficiencyInfo(comment: string) {
    if (comment && comment.length != null ) {
      const number = comment.substring(0, 8);
      const start = comment.substring(9, 19);
      const end = comment.substring(20, 30);

      return { number:number, start:start, end:end };
    }

    return null; // or handle the case when the comment is invalid
  }

  getCardDiaries(): any {
    return this.card.diarySet.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
      // Assuming "date" is a property of each object in the array
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Compare the dates
      if (dateA < dateB) {
        return -1; // a comes before b
      } else if (dateA > dateB) {
        return 1; // b comes before a
      } else {
        return 0; // dates are equal
      }
    });
  }
  compareFn(option: any, value: any): boolean {
    return option && value ? option.name === value : option === value;
  }

  get medications() {
    return this.historyForm.get('medications') as FormArray;
  }

  addMedication() {
    this.medications.push(this.fb.control(''));
  }
  addMedicationWithValue(meds:any) {
    this.medications.push(this.fb.control(meds));
  }

  get procedures() {
    return this.historyForm.get('procedures') as FormArray;
  }

  addProcedure() {
    this.procedures.push(this.fb.control(''));
  }
  addProcedureWithValue(proc:any) {
    this.procedures.push(this.fb.control(proc));
  }

  removeMedication(i: number) {
    this.medications.removeAt(i);

  }

  removeProcedure(i: number) {
    this.procedures.removeAt(i);
  }

  addDiary() {
    this.dialog.open(ModalFillDiaryComponent, {data: {
        card: this.card
      }
    });
  }
}
