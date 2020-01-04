import { TestBed } from '@angular/core/testing';

import { NewBookingService } from './new-booking.service';

describe('NewBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewBookingService = TestBed.get(NewBookingService);
    expect(service).toBeTruthy();
  });
});
