import { Component } from '@angular/core';
import {Services} from "../../../model/services/services";
import {Medication} from "../../../model/medication";
import {MedicationserviceService} from "../../../services/medication/medicationservice.service";
import {ProcedureService} from "../../../services/procedure/procedure.service";

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent {
  servColumns: string[] = [ 'procedure_name', 'group_id', 'clasification','acts'];
  dataSource: Services[];
  constructor(private service:ProcedureService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data=> {this.dataSource = data});
    console.log(this.service.findAll().subscribe());
  }
}
