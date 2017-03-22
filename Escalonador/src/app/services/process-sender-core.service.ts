import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcessSenderToCoreService {
  private addProcessToCoreSource = new ReplaySubject<ProcessoViewModel>(1);
  public addProccessToCore: Observable<ProcessoViewModel> = this.addProcessToCoreSource.asObservable();

  public SendManyProcess(ps: Processo[], color: string) {
    var pvm = new ProcessoViewModel();
    pvm.GrupoProcessos = ps;
    pvm.isGroup = true;
    pvm.color = color;
    
    this.addProcessToCoreSource.next(pvm);  
  }

  public SendProcess(p: Processo, color: string) {
    var pvm = new ProcessoViewModel();
    pvm.Processo = p;
    pvm.isGroup = false;
    pvm.color = color;
    this.addProcessToCoreSource.next(pvm);  
  }

}
