import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardsComponent } from './patient-cards.component';

describe('PatientCardsComponent', () => {
  let component: PatientCardsComponent;
  let fixture: ComponentFixture<PatientCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
