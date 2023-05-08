import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationarComponent } from './stationar.component';

describe('StationarComponent', () => {
  let component: StationarComponent;
  let fixture: ComponentFixture<StationarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
