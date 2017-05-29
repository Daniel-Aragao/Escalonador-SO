import { Injectable } from '@angular/core';
import { AlocarMemoriaViewModel } from "../models/AlocarMemoriaViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlocarMemoriaService {

  private requisicaoAlocacaoMemoriaSource = new ReplaySubject<AlocarMemoriaViewModel>(1);
  public handleNewProcess: Observable<AlocarMemoriaViewModel> = this.requisicaoAlocacaoMemoriaSource.asObservable();

  public OnRequisicaoAlocacaoMemoria(tamanhoAlocacao: number, processoId: number) {
    let requisicao = new AlocarMemoriaViewModel(processoId, tamanhoAlocacao);
    
    this.requisicaoAlocacaoMemoriaSource.next(requisicao);
  }

}
