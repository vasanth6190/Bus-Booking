import { TestBed } from '@angular/core/testing';

import { BuserviceService } from './buservice.service';

describe('BuserviceService', () => {
  let service: BuserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
