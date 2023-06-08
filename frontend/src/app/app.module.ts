import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { DoctorsMainComponent } from './components/doctors-main/doctors-main.component';
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./services/interceptor/auth.interceptor";
import { DoctorsComponent } from './admin-components/doctors/doctors.component';
import { AdminDashboardComponent } from './admin-components/admin-dashboard/admin-dashboard.component';
import { PatientCardsComponent } from './components/stationar/patient-cards/patient-cards.component';
import { FreeBedsComponent } from './components/stationar/free-beds/free-beds.component';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { PatientMenuComponent } from './components/patient-page/patient-menu/patient-menu.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import { PatientProfileInfoComponent } from './components/patient-page/patient-profile-info/patient-profile-info.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { ModalCreatecardComponent } from './components/stationar/modal-createcard/modal-createcard.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { PhoneNumberPipe } from './services/pipes/phone/phone-number.pipe';
import { AllDoctorsComponent } from './components/all-doctors/all-doctors.component';
import {jqxSchedulerModule} from "jqwidgets-ng/jqxscheduler";
import {AppointmentService} from "./services/appointment/appointment.service";
import {DxSchedulerModule} from "devextreme-angular";
import {ScheduleModule} from "@syncfusion/ej2-angular-schedule";
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { ModalCreateAppointmentComponentComponent } from './components/patient-page/modal-create-appointment-component/modal-create-appointment-component.component';
import { PatientAppointmentsHistoryComponent } from './components/patient-page/patient-appointments-history/patient-appointments-history.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ModalCreateApptDComponent } from './components/doctor-profile/modal-create-appt-d/modal-create-appt-d.component';
import { FillMedicalHistoryComponent } from './components/stationar/medicalHistory/fill-medical-history/fill-medical-history.component';
import {HistoryService} from "./services/history/history.service";
import { ModalCreateAppHComponent } from './components/stationar/modal-create-app-h/modal-create-app-h.component';
import { ModalFillDiaryComponent } from './components/stationar/modal-fill-diary/modal-fill-diary.component';
import { ModalSelectBedComponent } from './components/stationar/modal-select-bed/modal-select-bed.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
    DoctorsMainComponent,
    DoctorsComponent,
    AdminDashboardComponent,
    PatientCardsComponent,
    FreeBedsComponent,
    PatientPageComponent,
    PatientMenuComponent,
    PatientProfileInfoComponent,
    ModalCreatecardComponent,
    PhoneNumberPipe,
    AllDoctorsComponent,
    ModalCreateAppointmentComponentComponent,
    PatientAppointmentsHistoryComponent,
    ModalCreateApptDComponent,
    FillMedicalHistoryComponent,
    ModalCreateAppHComponent,
    ModalFillDiaryComponent,
    ModalSelectBedComponent,

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
        MatExpansionModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        jqxSchedulerModule,
        DxSchedulerModule,
        ScheduleModule,
        MatPaginatorModule,
        MatCheckboxModule,
      MatSnackBarModule

    ],
  providers: [authInterceptorProviders,DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    UserService,MedicationserviceService,ProcedureService,DoctorProfileService,StationarService,AppointmentService,HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
