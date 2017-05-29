import { Injectable } from '@angular/core';
import { AlocacaoMemoriaViewModel } from "../models/AlocacaoMemoriaViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequisicaoAlocacaoMemoriaService {

  private requisicaoAlocacaoMemoriaSource = new ReplaySubject<AlocacaoMemoriaViewModel>(1);
  public handleNewProcess: Observable<AlocacaoMemoriaViewModel> = this.requisicaoAlocacaoMemoriaSource.asObservable();

  public OnRequisicaoAlocacaoMemoria(tamanhoAlocacao: number, processoId: number) {
    let requisicao = new AlocacaoMemoriaViewModel(processoId, tamanhoAlocacao);
    
    this.requisicaoAlocacaoMemoriaSource.next(requisicao);
  }

}
