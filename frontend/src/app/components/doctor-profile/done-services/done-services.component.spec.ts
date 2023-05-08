import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneServicesComponent } from './done-services.component';

describe('DoneServicesComponent', () => {
  let component: DoneServicesComponent;
  let fixture: ComponentFixture<DoneServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
