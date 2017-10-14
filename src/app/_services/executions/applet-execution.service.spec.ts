import { TestBed, inject } from '@angular/core/testing';

import { AppletExecutionService } from './applet-execution.service';

describe('AppletExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppletExecutionService]
    });
  });

  it('should be created', inject([AppletExecutionService], (service: AppletExecutionService) => {
    expect(service).toBeTruthy();
  }));
});
