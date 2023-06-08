import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatecardComponent } from './modal-createcard.component';

describe('ModalCreatecardComponent', () => {
  let component: ModalCreatecardComponent;
  let fixture: ComponentFixture<ModalCreatecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreatecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
