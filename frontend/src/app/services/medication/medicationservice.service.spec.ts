import { TestBed } from '@angular/core/testing';

import { MedicationserviceService } from './medicationservice.service';

describe('MedicationserviceService', () => {
  let service: MedicationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
