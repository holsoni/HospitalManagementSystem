import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFillDiaryComponent } from './modal-fill-diary.component';

describe('ModalFillDiaryComponent', () => {
  let component: ModalFillDiaryComponent;
  let fixture: ComponentFixture<ModalFillDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFillDiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFillDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
