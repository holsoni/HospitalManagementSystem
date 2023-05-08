import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHospitalServicesComponent } from './all-hospital-services.component';

describe('AllHospitalServicesComponent', () => {
  let component: AllHospitalServicesComponent;
  let fixture: ComponentFixture<AllHospitalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHospitalServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHospitalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
