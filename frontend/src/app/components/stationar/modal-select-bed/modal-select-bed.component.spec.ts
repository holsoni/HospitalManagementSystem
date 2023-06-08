import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectBedComponent } from './modal-select-bed.component';

describe('ModalSelectBedComponent', () => {
  let component: ModalSelectBedComponent;
  let fixture: ComponentFixture<ModalSelectBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectBedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
