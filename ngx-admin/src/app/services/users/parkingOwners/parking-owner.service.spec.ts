import { TestBed } from '@angular/core/testing';

import { ParkingOwnerService } from './parking-owner.service';

describe('ParkingOwnerService', () => {
  let service: ParkingOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
