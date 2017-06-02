import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProcessSenderToCoreService } from '../services/process-sender-core.service';
import { CoreSenderService } from '../services/core-sender.service';
import { ProcessSenderService } from '../services/process-sender.service';
import { KillProcessService } from '../services/kill-process.service';

import { ProcessoViewModel } from '../models/ProcessoViewModel';
import { KillProcessViewModel } from '../models/KillProcessViewModel';
import { CoreViewModel } from "../models/CoreViewModel";
import { EAutopsia } from '../models/EAutopsia';
import { ELocalMorte } from '../models/ELocalMorte';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-processador',
  templateUrl: './processador.component.html',
  styleUrls: ['./processador.component.css']
})
export class ProcessadorComponent implements OnInit, OnDestroy {

  @Input() private running: boolean;
  @Input() private quantidadeCores: number;
  @Input() private showDeadline: boolean;
  private SendToCoreSubscription: Subscription;
  private KillProcessSubscription: Subscription;
  private cores: ProcessoViewModel[] = [];
  private pause:boolean = false;

  private count: number = 0;

  constructor(private ProcessSenderToCoreService: ProcessSenderToCoreService,
    private CoreSenderService: CoreSenderService,
    private ProcessSenderService: ProcessSenderService,
    private KillProcessService: KillProcessService) {
    this.HandleProcessoEscalonado = this.HandleProcessoEscalonado.bind(this);
    this.Loop = this.Loop.bind(this);
  }

  ngOnInit() {
    for (var i = 0; i < this.quantidadeCores; i++) {
      this.cores[i] = new ProcessoViewModel();
    }
    
    this.SendToCoreSubscription = this.ProcessSenderToCoreService.handleProcessoEscalonado.subscribe(
      (p: ProcessoViewModel) => this.HandleProcessoEscalonado(p));

    this.KillProcessSubscription = this.KillProcessService.handleKilledProcess.subscribe(
      (kp: KillProcessViewModel) => this.HandleKilledProcess(kp));

    this.Loop();
  }

  private HandleProcessoEscalonado(p: ProcessoViewModel) {
    this.cores[p.coreIndex] = p;    
  }

  private Loop(): void {
    if(!this.pause){
      this.VarrerCores();
    }

    if(this.running ){
      setTimeout(this.Loop, 1000);
    }
  }

  private VarrerCores(): void {
    let context = this;

    this.cores.forEach((core, index) => {
      if (this.IsCoreLivre(core)) {
        this.CoreSenderService.OnCoreLivre(index);
      }
      else if(core.Processo) {
        core.Processo.TRestante--; // erro undefined Processo causado pela nova regra do "IsCoreLivre"

        if (core.Processo.Quantum != undefined)
          core.Processo.Quantum--;

        if (this.IsProcessoOver(core)) {
          this.cores[index] = new ProcessoViewModel();
          this.cores[index].isFake = true;
          this.KillProcessService.OnKillProcess(core, true, EAutopsia.Done, ELocalMorte.Core);

          setTimeout(() => this.CoreSenderService.OnCoreLivre(index), 100);
        } else if (this.IsQuantumOver(core)) {
          this.cores[index] = new ProcessoViewModel();
          this.cores[index].isFake = true;
          this.ProcessSenderService.OnNewProcess(core.Processo, core.color);

          setTimeout(() => this.CoreSenderService.OnCoreLivre(index), 100);
        }
      }
    });

  }

  private IsCoreLivre(core: ProcessoViewModel): boolean {
    return (!core.Processo && !core.isFake);
  }

  private IsProcessoOver(core: ProcessoViewModel): boolean {
    return (core.Processo.TRestante <= 0);
  }

  private IsQuantumOver(core: ProcessoViewModel): boolean {
    if (core.Processo.Quantum == undefined){
      return false;
    }

    return (core.Processo.Quantum <= 0);
  }

  ngOnDestroy() {
    this.SendToCoreSubscription.unsubscribe();
    this.KillProcessSubscription.unsubscribe();
    this.cores = [];
  }

  private HandleKilledProcess(kp : KillProcessViewModel){
    if(!kp.Finished && kp.Autopsia == EAutopsia.OutOfMemory){
      setTimeout(() => this.CoreSenderService.OnCoreLivre(kp.ProcessoViewModel.coreIndex), 100);
    }
  }

}