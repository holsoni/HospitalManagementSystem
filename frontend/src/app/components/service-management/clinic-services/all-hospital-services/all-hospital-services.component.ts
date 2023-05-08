import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
const ELEMENT_DATA = [
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"},
  {status: "ОК", code: '_____', name: "Ідентифікація мікроорганізмів за біохімічними тестами", group: 'Виявлення та ідентифікація мікроорганізмів за біохімічними тестами',
    classificator:"Ідентифікація мікроорганізмів за біохімічними тестами"}
]

@Component({
  selector: 'app-all-hospital-services',
  templateUrl: './all-hospital-services.component.html',
  styleUrls: ['./all-hospital-services.component.scss']
})
export class AllHospitalServicesComponent {
  status = [
    'Оберіть статус послуги',
    'Так',
    'Ні',
  ];

  group = [
    'Оберіть групу послуги',
    'Ліквальні',
    'Операції',
  ];
  statusControl = new FormControl('');
  groupControl = new FormControl('');
  nameControl= new FormControl('');
  currentState: string | null = '';
  codeControl =  new FormControl('');
  displayedColumns: string[] = ['status', 'code', 'name', 'group','classificator','acts'];
  dataSource = ELEMENT_DATA;
}
