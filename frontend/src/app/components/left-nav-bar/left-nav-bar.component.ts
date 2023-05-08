import { Component } from '@angular/core';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrls: ['./left-nav-bar.component.scss']
})
export class LeftNavBarComponent {
    menu=[{id:1,
    name:"doctorProfile",
    imgSrc:"assets/nav-bar/stethoscope.png",
    route:"/doctorProfile"},
      {id:2,
        name:"calendar",
        imgSrc:"assets/nav-bar/calendar (6).png",
        route:"/calendar"},
      {id:3,
        name:"patients",
        imgSrc:"assets/nav-bar/crowd.png",
        route:"/patients"},
      {id:4,
        name:"schedule",
        imgSrc:"assets/nav-bar/calendar (7).png",
        route:"/schedule"},
      {id:5,
        name:"catalog",
        imgSrc:"assets/nav-bar/catalog.png",
        route:"/catalog"},
      {id:6,
        name:"cases",
        imgSrc:"assets/nav-bar/recycle.png",
        route:"/doctorProfile/cases/appointments"},
      {id:7,
        name:"serviceManagement",
        imgSrc:"assets/nav-bar/healthcare (1).png",
        route:"/serviceManagement"},
      {id:8,
        name:"stationar",
        imgSrc:"assets/nav-bar/hospital-bed (3).png",
        route:"/stationar"},
    ]
}
