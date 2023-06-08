import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {DoctorService} from "../../../services/doctor/doctor.service";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit{
  currentDoctor:any;
  constructor(private loginService:LoginService,
              private doctorService:DoctorService) {
  }
  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.doctorService.getByUserId(data).subscribe(data1 =>{
        this.currentDoctor = data1;
        console.log(data1);
      })
    })
    console.log("Profile info")
  }

}
