import { Component } from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private loginService:LoginService, private router:Router) {
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
}
