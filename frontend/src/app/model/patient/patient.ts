export class Patient {
  id:string;
  user:Object;
  firstName:string;
  lastName:string;
  fathersName:string;
  dateOfBirth:string;
  placeOfBirth:string;
  addresses:string[];
  phone:string;
  birthCode:string;
  gender:string;
  created_at:string;
  updated_at:string;

  getPatientNameAndLastNameAndID():string {
    let id = this.id.substring(0, 10);
    let firstName = this.firstName.substring(0, 10);
    let lastName = this.lastName.substring(0, 10);
    return `${id} ${firstName} ${lastName}`;
  }
}



