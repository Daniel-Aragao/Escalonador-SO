import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcessSenderService {
  // 1 for avoid cache
  private addProcessSource = new ReplaySubject<ProcessoViewModel>(1);
  public handleNewProcess: Observable<ProcessoViewModel> = this.addProcessSource.asObservable();

  public OnNewManyProcess(ps: Processo[], color: string) {
    var pvm = new ProcessoViewModel();
    pvm.GrupoProcessos = ps;
    pvm.isGroup = true;
    pvm.color = color;

    this.addProcessSource.next(pvm);
  }

  public OnNewProcess(p: Processo, color: string) {
    var pvm = new ProcessoViewModel();
    pvm.Processo = p;
    pvm.isGroup = false;
    pvm.color = color;

    this.addProcessSource.next(pvm);
  }

}
