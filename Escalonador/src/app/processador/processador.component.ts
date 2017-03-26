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

  @Input()
  private running: boolean;
  @Input()
  private quantidadeCores: number;
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
    console.log(this.cores)

    this.Loop();
  }

  private HandleProcessoEscalonado(p: ProcessoViewModel) {
    console.log(p);
    if (!p.isGroup) {
      //this.cores.push(new Pro p);
      this.cores[p.coreIndex] = p;
    } else {
      //p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => this.addProcessToQueue(v, p.color))
    }
  }

  private Loop(): void {
    this.VarrerCores();

    setTimeout(this.Loop, 1000);

  }

  private VarrerCores(): void {
    let context = this;

    this.cores.forEach((core, index) => {
      if (this.IsCoreLivre(core)) {

        console.log("Pedindo Processo")
        this.CoreSenderService.OnCoreLivre(index);
      }
      else {
        core.Processo.TRestante--;

        if (core.Processo.Quantum != undefined)
          core.Processo.Quantum--;

        //console.log(core.Processo.Quantum);

        if (this.IsProcessoOver(core)) {
          this.CoreSenderService.OnCoreLivre(index);
          this.cores[index] = new ProcessoViewModel();
        } else if (this.IsQuantumOver(core)) {
          this.ProcessSenderService.OnNewProcess(core.Processo, core.color);
          this.cores[index] = new ProcessoViewModel();

        }

      }
    });

  }

  private IsCoreLivre(core: ProcessoViewModel): boolean {
    return (!core.Processo);
  }

  private IsProcessoOver(core: ProcessoViewModel): boolean {
    return (core.Processo.TRestante === 0);
  }

  private IsQuantumOver(core: ProcessoViewModel): boolean {
    if (core.Processo.Quantum == undefined)
      return false;

    return (core.Processo.Quantum === 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}