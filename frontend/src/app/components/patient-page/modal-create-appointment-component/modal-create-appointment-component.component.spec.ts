import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAppointmentComponentComponent } from './modal-create-appointment-component.component';

describe('ModalCreateAppointmentComponentComponent', () => {
  let component: ModalCreateAppointmentComponentComponent;
  let fixture: ComponentFixture<ModalCreateAppointmentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateAppointmentComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateAppointmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
