import {Component, OnInit} from '@angular/core';
import {BedService} from "../../../services/bed/bed.service";

@Component({
  selector: 'app-free-beds',
  templateUrl: './free-beds.component.html',
  styleUrls: ['./free-beds.component.scss']
})
export class FreeBedsComponent implements OnInit{

  dataSource:any;
  displayedColumns: string[] = ['id', 'number', 'isFree'];

  constructor(private bedService:BedService) {
  }

  ngOnInit() {
    this.bedService.getAllByFreeIs(true).subscribe(response => {
      this.dataSource = response;
    })
  }

}
