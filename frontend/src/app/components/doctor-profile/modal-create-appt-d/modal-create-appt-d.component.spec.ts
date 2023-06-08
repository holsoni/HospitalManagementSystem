import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateApptDComponent } from './modal-create-appt-d.component';

describe('ModalCreateApptDComponent', () => {
  let component: ModalCreateApptDComponent;
  let fixture: ComponentFixture<ModalCreateApptDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateApptDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateApptDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
