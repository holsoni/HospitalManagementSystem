import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import * as uuid from "uuid";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StationarService} from "../../../services/stationar/stationar.service";
import {BedService} from "../../../services/bed/bed.service";

@Component({
  selector: 'app-modal-select-bed',
  templateUrl: './modal-select-bed.component.html',
  styleUrls: ['./modal-select-bed.component.scss']
})
export class ModalSelectBedComponent {
  bedControl = new FormControl('');
  beds:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalSelectBedComponent>,
              private stationarService:StationarService,
              private bedService:BedService
           ) {

    // Add 7 days to the minimum date
  }


  ngOnInit() {
    this.bedService.getAllByFreeIs(true).subscribe(response => {
      this.beds = response;
    })
  }



  onSubmit() {
    this.stationarService.update(this.editCardObject()).subscribe(response =>{
      console.log(response);
      this.bedService.update(this.editBedToTaken()).subscribe(response1 =>{
        console.log(response1);
      })
    })

    this.dialogRef.close();
  }


  editBedToTaken():any{
    let bed;
    bed = this.bedControl.value;
    // @ts-ignore
    bed.free = false;
    return bed;
  }
  editCardObject(): any {
    let card = this.data.card;
    let bed;
    let patient = card.patient;
    card.patient = {id:patient.id};
    let doctor = card.doctor;
    card.doctor = {id:doctor.id};
    card.bed = this.bedControl.value;
    card.hospitalized = true;
    console.log(card);
    return card;
  }

  cancel() {
    this.dialogRef.close();
  }
}
