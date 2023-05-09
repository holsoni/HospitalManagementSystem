import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Observable, Subscription} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LeftNavBarComponent } from './components/left-nav-bar/left-nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import {FlexModule} from "@angular/flex-layout";
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ServicesComponent } from './components/services/services.component';
import { StationarComponent } from './components/stationar/stationar.component';
import { CasesComponent } from './components/doctor-profile/cases/cases.component';
import { MySpavyComponent } from './components/my-spavy/my-spavy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { MedicationsComponent } from './components/services/medications/medications.component';
import { ProceduresComponent } from './components/services/procedures/procedures.component';
import {MedicationserviceService} from "./services/medication/medicationservice.service";
import {ProcedureService} from "./services/procedure/procedure.service";
import { DoctorsProfileAppointmentsComponent } from './components/doctor-profile/cases/doctors-profile-appointments/doctors-profile-appointments.component';
import { DoctorsProfileSearchByEmzComponent } from './components/doctor-profile/cases/doctors-profile-search-by-emz/doctors-profile-search-by-emz.component';
import { DoctorsProfileDoneProceduresComponent } from './components/doctor-profile/cases/doctors-profile-done-procedures/doctors-profile-done-procedures.component';
import { DoctorsProfileReportsComponent } from './components/doctor-profile/cases/doctors-profile-reports/doctors-profile-reports.component';
import {MatSelectModule} from "@angular/material/select";
import { ProfileInfoComponent } from './components/doctor-profile/profile-info/profile-info.component';
import { MedicalFormsComponent } from './components/doctor-profile/medical-forms/medical-forms.component';
import {DoctorProfileService} from "./services/doctor-profile/doctor-profile.service";
import {DoneServicesComponent} from "./components/doctor-profile/done-services/done-services.component";
import {MatLegacyPaginatorModule} from "@angular/material/legacy-paginator";
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { ClinicServicesComponent } from './components/service-management/clinic-services/clinic-services.component';
import { ServicesGroupsComponent } from './components/service-management/services-groups/services-groups.component';
import { ProtocolsComponent } from './components/service-management/protocols/protocols.component';
import { ServiceInfoComponent } from './components/service-management/clinic-services/service-info/service-info.component';
import { AllHospitalServicesComponent } from './components/service-management/clinic-services/all-hospital-services/all-hospital-services.component';
import {StationarService} from "./services/stationar/stationar.service";
import {RequestInterceptorInterceptor} from "./request-interceptor.interceptor";
import { DoctorsMainComponent } from './components/doctors-main/doctors-main.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeftNavBarComponent,
    HeaderComponent,
    DoctorProfileComponent,
    CalendarComponent,
    PatientsComponent,
    ScheduleComponent,
    ServicesComponent,
    StationarComponent,
    CasesComponent,
    MySpavyComponent,
    MedicationsComponent,
    ProceduresComponent,
    DoctorsProfileAppointmentsComponent,
    DoctorsProfileSearchByEmzComponent,
    DoctorsProfileDoneProceduresComponent,
    DoctorsProfileReportsComponent,
    ProfileInfoComponent,
    MedicalFormsComponent,
    DoneServicesComponent,
    ServiceManagementComponent,
    ClinicServicesComponent,
    ServicesGroupsComponent,
    ProtocolsComponent,
    ServiceInfoComponent,
    AllHospitalServicesComponent,
    DoctorsMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatLegacyPaginatorModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:RequestInterceptorInterceptor, multi:true},
    UserService,MedicationserviceService,ProcedureService,DoctorProfileService,StationarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
