import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menu=[{id:1,
    name:"Лікарі",
    imgSrc:"https://cdn-icons-png.flaticon.com/512/4305/4305152.png",
    route:"/doctorProfile"},
    {id:2,
      name:"Календар",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/591/591605.png",
      route:"/calendar"},
    {id:3,
      name:"Пацієнти",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/2302/2302715.png",
      route:"/patients"},
    {id:4,
      name:"Графіки",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/591/591608.png",
      route:"/schedule"},
    {id:5,
      name:"Каталог послуг і препаратів",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/3554/3554360.png",
      route:"/catalog"},
    {id:6,
      name:"Мої справи",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/5935/5935611.png",
      route:"/cases"},
    {id:7,
      name:"Стаціонар",
      imgSrc:"https://cdn-icons-png.flaticon.com/512/3209/3209018.png",
      route:"/stationar"},
  ]
}
