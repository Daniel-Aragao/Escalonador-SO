import { TestBed, inject } from '@angular/core/testing';

import { ProcessSenderCoreService } from './process-sender-core.service';

describe('ProcessSenderCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessSenderCoreService]
    });
  });

  it('should ...', inject([ProcessSenderCoreService], (service: ProcessSenderCoreService) => {
    expect(service).toBeTruthy();
  }));
});
