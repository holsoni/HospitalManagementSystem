import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorProfileComponent} from "./components/doctor-profile/doctor-profile.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {PatientsComponent} from "./components/patients/patients.component";
import {ServicesComponent} from "./components/services/services.component";
import {StationarComponent} from "./components/stationar/stationar.component";
import {CasesComponent} from "./components/doctor-profile/cases/cases.component";
import {HomeComponent} from "./components/home/home.component";
import {MySpavyComponent} from "./components/my-spavy/my-spavy.component";
import {MedicationsComponent} from "./components/services/medications/medications.component";
import {ProceduresComponent} from "./components/services/procedures/procedures.component";
import {
  DoctorsProfileAppointmentsComponent
} from "./components/doctor-profile/cases/doctors-profile-appointments/doctors-profile-appointments.component";
import {
  DoctorsProfileDoneProceduresComponent
} from "./components/doctor-profile/cases/doctors-profile-done-procedures/doctors-profile-done-procedures.component";
import {
  DoctorsProfileReportsComponent
} from "./components/doctor-profile/cases/doctors-profile-reports/doctors-profile-reports.component";
import {
  DoctorsProfileSearchByEmzComponent
} from "./components/doctor-profile/cases/doctors-profile-search-by-emz/doctors-profile-search-by-emz.component";
import {ProfileInfoComponent} from "./components/doctor-profile/profile-info/profile-info.component";
import {MedicalFormsComponent} from "./components/doctor-profile/medical-forms/medical-forms.component";
import {DoneServicesComponent} from "./components/doctor-profile/done-services/done-services.component";
import {ServiceManagementComponent} from "./components/service-management/service-management.component";
import {ClinicServicesComponent} from "./components/service-management/clinic-services/clinic-services.component";
import {ServicesGroupsComponent} from "./components/service-management/services-groups/services-groups.component";
import {ProtocolsComponent} from "./components/service-management/protocols/protocols.component";
import {
  ServiceInfoComponent
} from "./components/service-management/clinic-services/service-info/service-info.component";
import {
  AllHospitalServicesComponent
} from "./components/service-management/clinic-services/all-hospital-services/all-hospital-services.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationGuardGuard} from "./authentication-guard.guard";
import {DoctorsMainComponent} from "./components/doctors-main/doctors-main.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path:'workers', component:DoctorsMainComponent,
    children:[
              {path: 'doctorProfile',  component: DoctorProfileComponent,
                children:[
                          {path: '', redirectTo: 'cases/appointments', pathMatch: 'full'},
                          {path:'medicalForms',component:MedicalFormsComponent},
                          {path:'doneServices',component:DoneServicesComponent},
                          {path:'cases',component:CasesComponent,
                                  children:[
                                    {path:'appointments',component:DoctorsProfileAppointmentsComponent},
                                    {path:'reports',component:DoctorsProfileReportsComponent},
                                    {path:'procedures',component:DoctorsProfileDoneProceduresComponent},
                                    {path:'searchByEMZ',component:DoctorsProfileSearchByEmzComponent}]}]},
              { path: 'schedule', component: ScheduleComponent },
              {path:'doctorProfile/edit',component:ProfileInfoComponent},
              { path: 'calendar', component: CalendarComponent },
              { path: 'patients', component: PatientsComponent },
              { path: 'catalog', component: ServicesComponent,
                      children:[  {path: '', redirectTo: 'medications', pathMatch: 'full'},
                                {path:'medications',component:MedicationsComponent},
                                {path:'procedures',component:ProceduresComponent}]},
              { path: '', component: HomeComponent },
              { path: 'stationar', component: StationarComponent },
              { path: 'serviceManagement', component: ServiceManagementComponent,
                      children:[
                        {path: '', redirectTo: 'hospital/list', pathMatch: 'full'},
                        {path:'hospital',
                            children:[
                              {path: 'info', component: ServiceInfoComponent},
                              {path: 'list', component: AllHospitalServicesComponent}]},
                        {path:'groups',component:ServicesGroupsComponent},
                        {path:'protocols',component:ProtocolsComponent}]}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
