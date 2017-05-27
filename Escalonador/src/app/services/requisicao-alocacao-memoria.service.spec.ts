import { TestBed, inject } from '@angular/core/testing';

import { RequisicaoAlocacaoMemoriaService } from './requisicao-alocacao-memoria.service';

describe('RequisicaoAlocacaoMemoriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequisicaoAlocacaoMemoriaService]
    });
  });

  it('should be created', inject([RequisicaoAlocacaoMemoriaService], (service: RequisicaoAlocacaoMemoriaService) => {
    expect(service).toBeTruthy();
  }));
});
