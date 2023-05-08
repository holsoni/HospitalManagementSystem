import {Component, OnInit} from '@angular/core';
import {MedicalForm} from "../../../model/medical-form/medical-form";
import {DoctorProfileService} from "../../../services/doctor-profile/doctor-profile.service";

@Component({
  selector: 'app-done-services',
  templateUrl: './done-services.component.html',
  styleUrls: ['./done-services.component.scss']
})
export class DoneServicesComponent implements OnInit {
  servColumns: string[] = ['service', 'patient', 'pay','grn'];
  monthServices = 15;
  monthIncome = 1500.0;
  dataSource = [
    {service:"Послуга 1", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 2", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 3", patient:"Пацієнт 1", pay:"повна",grn:120.5},
    {service:"Послуга 4", patient:"Пацієнт 1", pay:"повна",grn:120.5}];

  constructor(private service: DoctorProfileService) {
  }

  ngOnInit() {
  }

}
