import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessSenderService } from '../../services/process-sender.service';
import { CoreSenderService } from '../../services/core-sender.service';
import { ProcessSenderToCoreService } from "../../services/process-sender-core.service"
import { KillProcessService } from '../../services/kill-process.service';
import { Processo } from '../../models/Processo';
import { ProcessoViewModel } from '../../models/ProcessoViewModel';
import { EAutopsia } from '../../models/EAutopsia';
import { ELocalMorte } from '../../models/ELocalMorte';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-least-time-to-go',
  templateUrl: './least-time-to-go.component.html',
  styleUrls: ['./least-time-to-go.component.css']
})
export class LeastTimeToGoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private coreSenderSubscription: Subscription;
  private processos: ProcessoViewModel[];

  constructor(private ProcessSenderService: ProcessSenderService, 
    private CoreSenderService: CoreSenderService,
    private ProcessSenderToCoreService: ProcessSenderToCoreService,
    private KillProcessService: KillProcessService) {

    this.processos = [];
    this.DeadlineKiller(this);
  }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.handleNewProcess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));

       this.coreSenderSubscription = this.CoreSenderService.handleCoreLivre.subscribe(
      (value: number) => this.HandleCoreLivre(value));
  }

  private HandleCoreLivre(coreIndex: number): void {
    let processo: ProcessoViewModel = null;

    if (this.IsExistProcess()) {
      processo = this.processos.shift();
    }else{
      return;
    }

    this.ProcessSenderToCoreService.OnNewProcessoEscalonado(processo.Processo, coreIndex, processo.color);
  }

  private IsExistProcess(): boolean {
      if (this.processos.length > 0)
        return true;
    return false;
  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      this.addProcessToQueue(null, null, p);
    } else {
      p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[])=> this.addProcessToQueue(v, p.color))
    }
  }

  private addProcessToQueue(p: Processo = null, color: string = null, pvm: ProcessoViewModel = null) {
    if (pvm == null) {    
      pvm = new ProcessoViewModel();
      pvm.Processo = p;
      pvm.color = color;
    }

    let insertIndex: number;
    for (insertIndex = 0; insertIndex < this.processos.length; insertIndex++){
      if (this.processos[insertIndex].Processo.TDeadline > pvm.Processo.TDeadline) {
        break;
      }
    }

    this.processos.splice(insertIndex, 0, pvm);
  }

  private DeadlineKiller(self: any) {
    for (var i = 0; i < this.processos.length; i++){
      var processo = this.processos[i].Processo;
      processo.TDeadline--;
      if (processo.TDeadline <= 0) {
        var deleted = this.processos.splice(i, 1);
        this.KillProcessService.OnKillProcess(deleted[0], false, EAutopsia.Timeout, ELocalMorte.Escalonador);
        i--;
      }
    }
    setTimeout(function () {
      self.DeadlineKiller(self);
    }, 1000);  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.coreSenderSubscription.unsubscribe();
  }
}
