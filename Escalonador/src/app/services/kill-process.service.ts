import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";
import { KillProcessViewModel } from "../models/KillProcessViewModel";
import { EAutopsia } from "../models/EAutopsia";
import { ELocalMorte } from "../models/ELocalMorte";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class KillProcessService {
  private addProcessSource = new ReplaySubject<KillProcessViewModel>(1);
  public handleKilledProcess: Observable<KillProcessViewModel> = this.addProcessSource.asObservable();

  public OnKillProcessViewModel(KillProcessViewModel: KillProcessViewModel) {
    this.addProcessSource.next(KillProcessViewModel);
  }

  public OnKillProcess(pvm: ProcessoViewModel, Finished: boolean, Autopsia: EAutopsia, LocalDeMorte: ELocalMorte) {
    var kpvm:KillProcessViewModel//
    kpvm = new KillProcessViewModel();
    kpvm.Autopsia = Autopsia;
    kpvm.LocalDeMorte = LocalDeMorte;
    kpvm.ProcessoViewModel = pvm;


    this.addProcessSource.next(kpvm);
  }

}
