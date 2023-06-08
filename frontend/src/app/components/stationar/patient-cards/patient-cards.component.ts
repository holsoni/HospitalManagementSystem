import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MedicalCard} from "../../../model/MedicalCard/medical-card";
import {StationarService} from "../../../services/stationar/stationar.service";
import {Patient} from "../../../model/patient/patient";
import {PageEvent} from "@angular/material/paginator";
import {
  ModalCreateAppointmentComponentComponent
} from "../../patient-page/modal-create-appointment-component/modal-create-appointment-component.component";
import {MatDialog} from "@angular/material/dialog";
import {DoctorService} from "../../../services/doctor/doctor.service";
import {ModalCreateAppHComponent} from "../modal-create-app-h/modal-create-app-h.component";
import {ModalFillDiaryComponent} from "../modal-fill-diary/modal-fill-diary.component";
import {ModalSelectBedComponent} from "../modal-select-bed/modal-select-bed.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-patient-cards',
  templateUrl: './patient-cards.component.html',
  styleUrls: ['./patient-cards.component.scss']
})
export class PatientCardsComponent implements OnInit{
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
  activeOption: string = '';
  displayedColumns: string[] = ['condition', 'patient', 'admission', 'dateTime','doctor','acts'];
  dataSource:MedicalCard[];
  selected:string;
  pageSize = 10;
  pageIndex = 0;
  totalItems = 100;

  constructor(private service:StationarService, private doctorService:DoctorService, private dialog:MatDialog,
              private snackBar: MatSnackBar) {
  }
  ngOnInit(){

    this.loadData();
  }
  loadData() {

    this.service.getAllCurrentTreatment(0, 10).subscribe(data => {
      let page = data;
      console.log(data);
      //@ts-ignore
      this.dataSource = data;
    });
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

  hospitalizedPressed(){
    this.service.getByHospitalized(true).subscribe(data=> {this.dataSource = data});
  }

  notHospitalizedPressed(){
    this.service.getByHospitalized(false).subscribe(data=> {this.dataSource = data});
  }

  toggleOption(id: string) {
    if (this.activeOption === id) {
      this.activeOption = ''; // Close the active menu if the same menu is clicked again
    } else {
      this.activeOption = id; // Open the clicked menu and close others
    }
  }

  isOptionVisible(id: string): boolean {
    return this.activeOption === id;
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    console.log(this.pageIndex)
    this.pageSize = $event.pageSize;
    console.log(this.pageSize)
    this.service.findAll(this.pageIndex, this.pageSize).subscribe(data=> {
      let page = data;
      //@ts-ignore
      this.dataSource = page.content});
    // Call the API to fetch data for the new page
    // Example: this.getAllByPatientId(this.patientId).subscribe(data => {
    //   this.dataSource = data;
    // });
  }

  planAppointment(card: any) {
    this.dialog.open(ModalCreateAppHComponent, {data: {
        card: card
      }
    });
  }

  deleteCard(id:any) {
    this.service.delete(id).subscribe(response=>console.log("Deleted medicalCard"),
      error => console.log("ERROR", error));
    this.loadData();
  }

  cancelTreatment(card:any){
    this.service.updateCancelTreatment(card.id, true).subscribe(response => {
        this.showSnackbar('Operation successful', 'check');
      }, error =>  {
        this.showSnackbar('Error occurred', 'error');
      })
    };

  addDiary(card:any) {
    this.dialog.open(ModalFillDiaryComponent, {data: {
        card: card
      }
    });
  }

  hospitalization(card:any){
    this.dialog.open(ModalSelectBedComponent, {data: {
        card: card
      }
    });
  }
  showSnackbar(message: string, icon: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [icon + '-snackbar'],
    });
  }

}
