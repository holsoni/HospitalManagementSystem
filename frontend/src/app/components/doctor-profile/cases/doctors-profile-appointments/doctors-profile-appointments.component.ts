import {Component, OnInit} from '@angular/core';
import {Services} from "../../../../model/services/services";
import {ProcedureService} from "../../../../services/procedure/procedure.service";
import {LoginService} from "../../../../services/login/login.service";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import DevExpress from "devextreme";
import data = DevExpress.data;

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
export class DoctorsProfileAppointmentsComponent implements OnInit{
  servColumns: string[] = [ 'date', 'patient', 'diagnose','status','acts'];
  currentDoctor:any = {};
  dataSource :any =[] ;
  selected:string;
  constructor(private userService:LoginService, private appointmentService:AppointmentService) {
  }

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(data => {
      console.log(data)
      //@ts-ignore
      let id = data.id;
      console.log(id);
      //@ts-ignore
      this.appointmentService.getAllByDoctorId(id).subscribe(data1 =>{
        this.dataSource = data1;
        console.log(data1);
      })
    })
    this.appointmentService.getAllByDoctorId(this.userService.getUser())
  }

}
