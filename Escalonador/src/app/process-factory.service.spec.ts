import { TestBed, inject } from '@angular/core/testing';

import { ProcessFactoryService } from './process-factory.service';

describe('ProcessFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessFactoryService]
    });
  });

  it('should ...', inject([ProcessFactoryService], (service: ProcessFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
