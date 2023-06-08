import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentsHistoryComponent } from './patient-appointments-history.component';

describe('PatientAppointmentsHistoryComponent', () => {
  let component: PatientAppointmentsHistoryComponent;
  let fixture: ComponentFixture<PatientAppointmentsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointmentsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
