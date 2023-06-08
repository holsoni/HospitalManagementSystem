import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DoctorService} from "../../services/doctor/doctor.service";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.scss']
})
export class AllDoctorsComponent implements OnInit{
  specializationControl = new FormControl('');
  nameControl = new FormControl('');
  dataSource:any[] = [];

  constructor(private doctorService:DoctorService) {
  }
  getBySpecialty() {
    this.doctorService.getBySpecialization(this.specializationControl.value).subscribe(data=>
    {this.dataSource = data});
  }
  getByName() {
    this.doctorService.getByLastNameContains(this.nameControl.value).subscribe(data=>{this.dataSource = data});
  }

  ngOnInit(): void {
    this.doctorService.getAll().subscribe(data => {
      this.dataSource = data;
      console.log(data)
    })
  }


}
