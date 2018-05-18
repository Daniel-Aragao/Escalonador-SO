import { Injectable } from '@angular/core';
import { AlocarMemoriaViewModel } from "../models/AlocarMemoriaViewModel";
import { ProcessoViewModel } from "../models/ProcessoViewModel"

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlocarMemoriaService {

  private requisicaoAlocacaoMemoriaSource = new ReplaySubject<AlocarMemoriaViewModel>(1);
  public handleNewProcess: Observable<AlocarMemoriaViewModel> = this.requisicaoAlocacaoMemoriaSource.asObservable();

  public OnRequisicaoAlocacaoMemoria(ProcessoViewModel: ProcessoViewModel) {
    let requisicao = new AlocarMemoriaViewModel(ProcessoViewModel.Processo.QuantidadeBytes(), ProcessoViewModel);
    
    this.requisicaoAlocacaoMemoriaSource.next(requisicao);
  }

}
