import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpavyComponent } from './my-spavy.component';

describe('MySpavyComponent', () => {
  let component: MySpavyComponent;
  let fixture: ComponentFixture<MySpavyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpavyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpavyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
