import { TestBed } from '@angular/core/testing';

import { ManageAccessService } from './manage-access.service';

describe('ManageAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAccessService = TestBed.get(ManageAccessService);
    expect(service).toBeTruthy();
  });
});
