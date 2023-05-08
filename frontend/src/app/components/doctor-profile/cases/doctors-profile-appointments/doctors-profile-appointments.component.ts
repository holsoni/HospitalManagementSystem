import { Component } from '@angular/core';
import {Services} from "../../../../model/services/services";
import {ProcedureService} from "../../../../services/procedure/procedure.service";

const ELEMENT_DATA = [
  {date: 1, patient: 'Hydrogen', diagnose: 1.0079, status: 'H',acts:["av","avd"]},
  {date: 2, patient: 'Hydrogen', diagnose: 1.0079, status: 'H',acts:["av","avd"]},
  {date: 3, patient: 'Hydrogen', diagnose: 1.0079, status: 'H',acts:["av","avd"]},
  {date: 4, patient: 'Hydrogen', diagnose: 1.0079, status: 'H',acts:["av","avd"]},

];
@Component({
  selector: 'app-doctors-profile-appointments',
  templateUrl: './doctors-profile-appointments.component.html',
  styleUrls: ['./doctors-profile-appointments.component.scss']
})
export class DoctorsProfileAppointmentsComponent {
  servColumns: string[] = [ 'date', 'patient', 'diagnose','status','acts'];
  dataSource = ELEMENT_DATA ;
  selected:string;
  constructor() {
  }

}
