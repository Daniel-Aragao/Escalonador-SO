import { TestBed, inject } from '@angular/core/testing';

import { ProcessSenderService } from './process-sender.service';

describe('ProcessSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessSenderService]
    });
  });

  it('should ...', inject([ProcessSenderService], (service: ProcessSenderService) => {
    expect(service).toBeTruthy();
  }));
});
