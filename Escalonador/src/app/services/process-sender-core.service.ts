import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcessSenderToCoreService {
  private addProcessToCoreSource = new ReplaySubject<ProcessoViewModel>(1);
  public handleProcessoEscalonado: Observable<ProcessoViewModel> = this.addProcessToCoreSource.asObservable();

  public OnNewManyProcessoEscalonado(ps: Processo[], color: string) {
    var pvm = new ProcessoViewModel();
    pvm.GrupoProcessos = ps;
    pvm.isGroup = true;
    pvm.color = color;
    
    this.addProcessToCoreSource.next(pvm);  
  }

  public OnNewProcessoEscalonado(p: Processo, coreIndex: number, color: string) {
    var pvm = new ProcessoViewModel();
    pvm.Processo = p;
    pvm.isGroup = false;
    pvm.color = color;
    pvm.coreIndex = coreIndex;
    this.addProcessToCoreSource.next(pvm);  
  }

}
