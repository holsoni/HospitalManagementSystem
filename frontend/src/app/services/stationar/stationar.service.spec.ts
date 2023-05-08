import { TestBed } from '@angular/core/testing';

import { StationarService } from './stationar.service';

describe('StationarService', () => {
  let service: StationarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
