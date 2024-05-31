import { TestBed } from '@angular/core/testing';

import { CartupdateService } from './cartupdate.service';

describe('CartupdateService', () => {
  let service: CartupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
