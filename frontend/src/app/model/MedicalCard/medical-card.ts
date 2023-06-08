import {Patient} from "../patient/patient";
import { v4 as uuidv4 } from 'uuid';

export class MedicalCard {
  id: string;
  condition: string;
  symptoms: any;
  patient: object;
  admission: string;
  dateTime: any;
  doctor: object;
  isHospitalized: boolean;
  bed: number;
  created_at:any;
  updated_at:any;

  constructor(
    condition: string,
    patient: object,
    admission: string,
    doctor: object,
    dateTime: any,

  ) {
    this.condition = condition;
    this.patient = patient;
    this.admission = admission;
    this.dateTime = dateTime;
    this.doctor = doctor;
  }


}


