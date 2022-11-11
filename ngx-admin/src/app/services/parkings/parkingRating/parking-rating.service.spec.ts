import { TestBed } from '@angular/core/testing';

import { ParkingRatingService } from './parking-rating.service';

describe('ParkingRatingService', () => {
  let service: ParkingRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
