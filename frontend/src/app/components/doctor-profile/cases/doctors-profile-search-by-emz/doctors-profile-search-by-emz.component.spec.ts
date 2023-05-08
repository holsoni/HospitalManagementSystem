import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsProfileSearchByEmzComponent } from './doctors-profile-search-by-emz.component';

describe('DoctorsProfileSearchByEmzComponent', () => {
  let component: DoctorsProfileSearchByEmzComponent;
  let fixture: ComponentFixture<DoctorsProfileSearchByEmzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsProfileSearchByEmzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsProfileSearchByEmzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
