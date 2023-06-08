import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {DoctorService} from "../../services/doctor/doctor.service";
import {ModalCreatecardComponent} from "../stationar/modal-createcard/modal-createcard.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreateApptDComponent} from "./modal-create-appt-d/modal-create-appt-d.component";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{
  currentDoctor:any;
  constructor(private loginService:LoginService,
              private doctorService:DoctorService,
              private dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.doctorService.getByUserId(data).subscribe(data1 =>{
        this.currentDoctor = data1;
        console.log(data);
        console.log(data1);
      })
    })
    console.log("Profile info")
  }
  openDialog() {
    console.log("Open dialog");
    this.dialog.open(ModalCreateApptDComponent, {
    });
  }
}
