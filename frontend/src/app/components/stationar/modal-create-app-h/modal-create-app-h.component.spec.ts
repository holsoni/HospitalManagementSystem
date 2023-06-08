import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAppHComponent } from './modal-create-app-h.component';

describe('ModalCreateAppHComponent', () => {
  let component: ModalCreateAppHComponent;
  let fixture: ComponentFixture<ModalCreateAppHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateAppHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateAppHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
