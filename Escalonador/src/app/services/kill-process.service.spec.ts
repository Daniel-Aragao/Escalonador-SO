import { TestBed, inject } from '@angular/core/testing';

import { KillProcessService } from './kill-process.service';

describe('KillProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KillProcessService]
    });
  });

  it('should ...', inject([KillProcessService], (service: KillProcessService) => {
    expect(service).toBeTruthy();
  }));
});
