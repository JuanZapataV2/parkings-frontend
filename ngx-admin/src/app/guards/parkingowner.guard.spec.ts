import { TestBed } from '@angular/core/testing';

import { ParkingownerGuard } from './parkingowner.guard';

describe('ParkingownerGuard', () => {
  let guard: ParkingownerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ParkingownerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
