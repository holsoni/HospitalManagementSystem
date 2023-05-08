import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsProfileAppointmentsComponent } from './doctors-profile-appointments.component';

describe('DoctorsProfileAppointmentsComponent', () => {
  let component: DoctorsProfileAppointmentsComponent;
  let fixture: ComponentFixture<DoctorsProfileAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsProfileAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsProfileAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
