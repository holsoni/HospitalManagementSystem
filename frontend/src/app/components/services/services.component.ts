import { Component } from '@angular/core';
import {Medication} from "../../model/medication";
import {Services} from "../../model/services/services";


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent {
  medsButton= false;
  servButton = true;


 viewMedicationsTable(){
    this.medsButton = true;
    this.servButton = false;
  }
  viewServicesTable(){
    this.medsButton = false;
    this.servButton = true;
  }
}
