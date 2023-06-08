import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient/patient";
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../../services/patient/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreatecardComponent} from "../../stationar/modal-createcard/modal-createcard.component";
import {
  ModalCreateAppointmentComponentComponent
} from "../modal-create-appointment-component/modal-create-appointment-component.component";

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit{

  patient:any;
  panelOpenState = false;

  menu = [{
    title:'Профіль',

    items:[{
      title:'Персональні дані',
      link:'./profileInfo'
    },
      {
        title:'Контактна інформація',
        place:''
      },
      {
        title:'Документи',
        place:''
      },
      {
        title:'Пільгові категорії',
        place:''
      },
      {
        title:'Адреси',
        place:''
      },{
        title:'Персональні дані',
        place:''
      }],
    open:false,
  },
    {
      title:'Історія прийомів',
      open:false,
      link:'./appointmentsHistory'
    },
    {
      title:'Медична карта',
      items:[{
        title:'Історія захворювань',
        link:''
      },
        {
          title:'Процедури',
          link:''
        }],
      open:false,
    },
    {
      title:'Медичні документи',
      open:false,
    },
    {
      title:'Страхування',
      open:false,
    },
    {
      title:'Призначення',
      items:[{
        title:'',
        link:''
      }],
      open:false,
    }]

  constructor(private route:ActivatedRoute,private patientService:PatientService, private dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.patientService.findById(id).subscribe(data => {
        this.patient = data;
        console.log(this.patient);
      });
    });
  }

  goToProfileInfo(){

  }

  planAppointment() {
    console.log(this.patient.id);
    this.dialog.open(ModalCreateAppointmentComponentComponent, {data: {
        patientId: this.patient.id
      }
    });
  }
}
