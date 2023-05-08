import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl} from "@angular/forms";
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
export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');
  sessionId:any = "";

  constructor(
    private loginService:LoginService,
    private router:Router) {
  }


  onSubmit(){

    let user = {username:this.username.value,password:this.password.value};
    console.log(user);
    // @ts-ignore
    this.loginService.login(user).subscribe(res =>{
      if(res){
        this.router.navigate(['']);}})


  }

}
