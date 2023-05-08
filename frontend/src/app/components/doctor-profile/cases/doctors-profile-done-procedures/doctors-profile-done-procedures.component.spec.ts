import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsProfileDoneProceduresComponent } from './doctors-profile-done-procedures.component';

describe('DoctorsProfileDoneProceduresComponent', () => {
  let component: DoctorsProfileDoneProceduresComponent;
  let fixture: ComponentFixture<DoctorsProfileDoneProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsProfileDoneProceduresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsProfileDoneProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
