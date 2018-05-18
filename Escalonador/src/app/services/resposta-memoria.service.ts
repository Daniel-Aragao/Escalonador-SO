import { Injectable } from '@angular/core';
import { AlocarMemoriaViewModel } from "../models/AlocarMemoriaViewModel";
import { ProcessoViewModel } from "../models/ProcessoViewModel"

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RespostaMemoriaService {

  private respostaAlocacaoMemoriaSource = new ReplaySubject<AlocarMemoriaViewModel>(1);
  public handleNextRaised: Observable<AlocarMemoriaViewModel> = this.respostaAlocacaoMemoriaSource.asObservable();

  public OnRespostaAlocacaoMemoria(AlocarMemoriaViewModel: AlocarMemoriaViewModel) {
    // let requisicao = new AlocarMemoriaViewModel(ProcessoViewModel);
    
    this.respostaAlocacaoMemoriaSource.next(AlocarMemoriaViewModel);
  }

}
