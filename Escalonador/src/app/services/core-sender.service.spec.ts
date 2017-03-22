import { TestBed, inject } from '@angular/core/testing';

import { CoreSenderService } from './core-sender.service';

describe('CoreSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreSenderService]
    });
  });

  it('should ...', inject([CoreSenderService], (service: CoreSenderService) => {
    expect(service).toBeTruthy();
  }));
});
