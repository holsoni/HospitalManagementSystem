import {Component, Injectable, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {PatientService} from "../../../services/patient/patient.service";
import {ActivatedRoute} from "@angular/router";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";

import {ɵLocalizeFn} from "@angular/localize"
import {Subject} from 'rxjs';

/*
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Наступна сторінка';
  previousPageLabel = 'Попередня сторінка ';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Сторінка 1 з 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Сторінка ${page + 1} з ${amountPages}`;
  }
}
*/


@Component({
  selector: 'app-patient-appointments-history',
  templateUrl: './patient-appointments-history.component.html',
  styleUrls: ['./patient-appointments-history.component.scss'],
/*
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
*/

})
export class PatientAppointmentsHistoryComponent implements OnInit{
  servColumns: string[] = [ 'date', 'doctor', 'type','status','acts'];
  patientId:any = {};
  dataSource :any =[] ;
  selected = "Сортувати за:";

  pageSize = 10;
  pageIndex = 0;
  totalItems = 100;

  constructor(private patientService:PatientService, private appointmentService:AppointmentService,
              private route:ActivatedRoute) {
  }

  ngOnInit(){
    // @ts-ignore
    this.route.parent.params.subscribe(params => {
      const id = params['id'];
      this.patientId = params['id'];
      console.log(id);
      this.appointmentService.getAllByPatientId(id,0  ,10).subscribe(data1 =>{
        this.dataSource = data1;
      })
    })
  }


  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    console.log(this.pageIndex)
    this.pageSize = $event.pageSize;
    console.log(this.pageSize)

    // Call the API to fetch data for the new page
    // Example: this.getAllByPatientId(this.patientId).subscribe(data => {
    //   this.dataSource = data;
    // });

    this.appointmentService.getAllByPatientId(this.patientId,this.pageIndex,this.pageSize).subscribe(data1 =>{
      this.dataSource = data1;
    })  }
}
