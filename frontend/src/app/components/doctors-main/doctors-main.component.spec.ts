import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsMainComponent } from './doctors-main.component';

describe('DoctorsMainComponent', () => {
  let component: DoctorsMainComponent;
  let fixture: ComponentFixture<DoctorsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
