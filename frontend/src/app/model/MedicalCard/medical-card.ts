import {Patient} from "../patient/patient";

export class MedicalCard {
  id: string;
  condition: string;
  symptoms: string;
  patient: Patient = new Patient();
  admission: string;
  dateTime: string;
  doctor: object;
  isHospitalized: boolean;
  bed: number;
  created_at:string;
  updated_at:string;

}


