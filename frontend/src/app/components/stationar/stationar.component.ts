import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {StationarService} from "../../services/stationar/stationar.service";
import {MedicalCard} from "../../model/MedicalCard/medical-card";
import {Patient} from "../../model/patient/patient";
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
export class StationarComponent implements OnInit{
  patientStates = [
    'Оберіть стан пацієнта',
    'Стабільний',
    'Важкий',
    'Стабільно-важкий',
    'Нормальний'
  ];
  patientStateControl = new FormControl('');
  doctorControl= new FormControl('');
  currentState: string | null = '';
  patientControl =  new FormControl('');

  displayedColumns: string[] = ['condition', 'patient', 'admission', 'dateTime','doctor','acts'];
  dataSource:MedicalCard[];
  selected:string;

  constructor(private service:StationarService) {
  }
  ngOnInit(){
    this.service.findAll().subscribe(data=> {this.dataSource = data});
  }



  getPatientNameAndLastNameAndID(patient:Patient):string {
    let id = patient.id ? patient.id.substring(0, 13) : '';
    let firstName = patient.firstName ? patient.firstName : '';
    let lastName = patient.lastName ? patient.lastName : '';

    return `${id} ${firstName} ${lastName}`;
  }

  getByDoctor(){
    this.service.findAllByDoctor(this.doctorControl.value).subscribe(data=> {this.dataSource = data});
    console.log(this.dataSource)
  }
  changeState() {
    this.currentState = this.patientStateControl.value;
    this.service.findAllByCondition(this.currentState).subscribe(data=> {this.dataSource = data});
    console.log(this.dataSource)
  }
}
