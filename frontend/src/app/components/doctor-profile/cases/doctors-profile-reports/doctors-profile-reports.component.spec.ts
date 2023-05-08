import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsProfileReportsComponent } from './doctors-profile-reports.component';

describe('DoctorsProfileReportsComponent', () => {
  let component: DoctorsProfileReportsComponent;
  let fixture: ComponentFixture<DoctorsProfileReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsProfileReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsProfileReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
