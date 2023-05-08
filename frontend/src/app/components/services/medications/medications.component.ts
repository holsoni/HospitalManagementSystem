import {Component, OnInit} from '@angular/core';
import {Medication} from "../../../model/medication";
import {Observable} from "rxjs";
import {MedicationserviceService} from "../../../services/medication/medicationservice.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit{
  dataSource: Medication[]=[];
  medicsColumns: string[] = [ 'name', 'type', 'dayDose','maxDayDose','ingredients'];
  patientStateControl = new FormControl('');
  searchByName = new FormControl('');


  constructor(private service:MedicationserviceService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data=> {this.dataSource = data});
    console.log(this.service.findAll().subscribe());
  }

  findByName():void{
    this.service.findAllByName(this.searchByName.value).subscribe(data=> {this.dataSource = data});
    console.log(this.dataSource);
  }

  dataNotNull():boolean{
    return this.dataSource.length!=0;
  }

}
