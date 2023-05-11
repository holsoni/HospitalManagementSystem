import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {LoginService} from "../../services/login/login.service";
import {User} from "../../model/user";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  userForm = this.fb.group({
      username: [''],
      password: ['']
    }
  )

  sessionId:any = "";

  constructor(
    private loginService:LoginService,
    private router:Router,
    private fb:FormBuilder) {
  }

  ngOnInit(): void {
  }


  onSubmit(){
    this.loginService.generateToken(this.userForm.value).subscribe(
      (data:any)=>{
        console.log('success !');
        console.log(data);

        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);

            if(this.loginService.getUserRole()=="admin"){
              window.location.href = '/admin';
            } else if (this.loginService.getUserRole()=="doctor") {
              window.location.href = '/workers'
            }
            else {
              this.loginService.logout();
            }
          }
        )
      },
      (error)=> {
        console.log("error !");
        console.log(error)
      })
  }

}
