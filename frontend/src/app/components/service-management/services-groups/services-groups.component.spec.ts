import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesGroupsComponent } from './services-groups.component';

describe('ServicesGroupsComponent', () => {
  let component: ServicesGroupsComponent;
  let fixture: ComponentFixture<ServicesGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
