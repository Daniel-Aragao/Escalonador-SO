import { Component, OnInit, Input } from '@angular/core';
import { ProcessSenderToCoreService } from '../services/process-sender-core.service';
import { CoreSenderService } from '../services/core-sender.service';
import { ProcessSenderService } from '../services/process-sender.service';

import { ProcessoViewModel } from '../models/ProcessoViewModel';
import { CoreViewModel } from "../models/CoreViewModel";

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-processador',
  templateUrl: './processador.component.html',
  styleUrls: ['./processador.component.css']
})
export class ProcessadorComponent implements OnInit {

  @Input() private running: boolean;
  @Input() private quantidadeCores: number;
  private subscription: Subscription;
  private cores: ProcessoViewModel[] = [];

  private count: number = 0;

  constructor(private ProcessSenderToCoreService: ProcessSenderToCoreService,
    private CoreSenderService: CoreSenderService,
    private ProcessSenderService: ProcessSenderService) {
    this.HandleProcessoEscalonado = this.HandleProcessoEscalonado.bind(this);
    this.Loop = this.Loop.bind(this);
  }

  ngOnInit() {
    this.subscription = this.ProcessSenderToCoreService.handleProcessoEscalonado.subscribe(
      (p: ProcessoViewModel) => this.HandleProcessoEscalonado(p));

    for (var i = 0; i < this.quantidadeCores; i++) {
      this.cores[i] = new ProcessoViewModel();
    }
    this.Loop();
  }

  private HandleProcessoEscalonado(p: ProcessoViewModel) {
    this.cores[p.coreIndex] = p;    
  }

  private Loop(): void {
    this.VarrerCores();

    if(this.running){
      setTimeout(this.Loop, 1000);
    }
  }

  private VarrerCores(): void {
    let context = this;

    this.cores.forEach((core, index) => {
      if (this.IsCoreLivre(core)) {
        this.CoreSenderService.OnCoreLivre(index);
      }
      else {
        core.Processo.TRestante--;

        if (core.Processo.Quantum != undefined)
          core.Processo.Quantum--;

        if (this.IsProcessoOver(core)) {
          this.cores[index] = new ProcessoViewModel();

          setTimeout(() => this.CoreSenderService.OnCoreLivre(index), 100);
        } else if (this.IsQuantumOver(core)) {
          this.cores[index] = new ProcessoViewModel();
          this.ProcessSenderService.OnNewProcess(core.Processo, core.color);

          setTimeout(() => this.CoreSenderService.OnCoreLivre(index), 100);
        }
      }
    });

  }

  private IsCoreLivre(core: ProcessoViewModel): boolean {
    return (!core.Processo);
  }

  private IsProcessoOver(core: ProcessoViewModel): boolean {
    return (core.Processo.TRestante <= 0);
  }

  private IsQuantumOver(core: ProcessoViewModel): boolean {
    if (core.Processo.Quantum == undefined)
      return false;

    return (core.Processo.Quantum <= 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}