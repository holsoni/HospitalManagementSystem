import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMedicalHistoryComponent } from './fill-medical-history.component';

describe('FillMedicalHistoryComponent', () => {
  let component: FillMedicalHistoryComponent;
  let fixture: ComponentFixture<FillMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillMedicalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
