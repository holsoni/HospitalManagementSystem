import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {StationarService} from "../../services/stationar/stationar.service";
import {MedicalCard} from "../../model/MedicalCard/medical-card";
import {Patient} from "../../model/patient/patient";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreatecardComponent} from "./modal-createcard/modal-createcard.component";
const ELEMENT_DATA = [
  {state: 1, patientCard: 'Hydrogen', reason: 1.0079, dateAndTime: 'H',doctor:"av"},
  {state: 1, patientCard: 'Hydrogen', reason: 1.0079, dateAndTime: 'H',doctor:"av"},
  {state: 1, patientCard: 'Hydrogen', reason: 1.0079, dateAndTime: 'H',doctor:"av"},
  {state: 1, patientCard: 'Hydrogen', reason: 1.0079, dateAndTime: 'H',doctor:"av"}]


@Component({
  selector: 'app-stationar',
  templateUrl: './stationar.component.html',
  styleUrls: ['./stationar.component.scss']
})
export class StationarComponent{

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalCreatecardComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}
