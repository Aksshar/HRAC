import { TestBed } from '@angular/core/testing';

import { UserAttendanceService } from './user-attendance.service';

describe('UserAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAttendanceService = TestBed.get(UserAttendanceService);
    expect(service).toBeTruthy();
  });
});
