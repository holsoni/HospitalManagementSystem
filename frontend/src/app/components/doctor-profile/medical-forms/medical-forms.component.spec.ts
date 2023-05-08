import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFormsComponent } from './medical-forms.component';

describe('MedicalFormsComponent', () => {
  let component: MedicalFormsComponent;
  let fixture: ComponentFixture<MedicalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
