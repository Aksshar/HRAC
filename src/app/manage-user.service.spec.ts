import { TestBed } from '@angular/core/testing';

import { ManageUserService } from './manage-user.service';

describe('ManageUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageUserService = TestBed.get(ManageUserService);
    expect(service).toBeTruthy();
  });
});
