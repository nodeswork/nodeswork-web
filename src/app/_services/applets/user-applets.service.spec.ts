import { TestBed, inject } from '@angular/core/testing';

import { UserAppletsService } from './user-applets.service';

describe('UserAppletsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAppletsService]
    });
  });

  it('should be created', inject([UserAppletsService], (service: UserAppletsService) => {
    expect(service).toBeTruthy();
  }));
});
