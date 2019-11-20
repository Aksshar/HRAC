import { TestBed } from '@angular/core/testing';

import { ManageHallsService } from './manage-halls.service';

describe('ManageHallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageHallsService = TestBed.get(ManageHallsService);
    expect(service).toBeTruthy();
  });
});
