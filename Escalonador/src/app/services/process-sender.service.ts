import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ProcessSenderService {
  private addProcessSource = new ReplaySubject<ProcessoViewModel>();
  public addProccess = this.addProcessSource.asObservable();

  constructor() { }

  public SendManyProcess(ps: Processo[], color: string) {
    var pvm = new ProcessoViewModel();
    pvm.GrupoProcessos = ps;
    pvm.isGroup = true;
    pvm.color = color;

    this.addProcessSource.next(pvm);  
  }

  public SendProcess(p: Processo, color: string) {
    var pvm = new ProcessoViewModel();
    pvm.Processo = p;
    pvm.isGroup = false;
    pvm.color = color;

    this.addProcessSource.next(pvm);  
  }

}
