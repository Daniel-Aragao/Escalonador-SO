import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class KillProcessService {
  private addProcessSource = new ReplaySubject<ProcessoViewModel>(1);
  public handleKilledProcess: Observable<ProcessoViewModel> = this.addProcessSource.asObservable();

  public OnKillProcess(pvm: ProcessoViewModel, finished: boolean) {
    pvm.finished = finished;
    this.addProcessSource.next(pvm);
  }

}
