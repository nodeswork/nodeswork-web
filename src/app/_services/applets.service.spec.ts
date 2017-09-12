import { TestBed, inject } from '@angular/core/testing';

import { AppletsService } from './applets.service';

describe('AppletsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppletsService]
    });
  });

  it('should be created', inject([AppletsService], (service: AppletsService) => {
    expect(service).toBeTruthy();
  }));
});
