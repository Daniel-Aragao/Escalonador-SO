import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProcessSenderService } from '../../services/process-sender.service';
import { CoreSenderService } from '../../services/core-sender.service';
import { ProcessSenderToCoreService } from "../../services/process-sender-core.service";
import { AlocarMemoriaService } from "../../services/alocar-memoria.service";
import { Processo } from '../../models/Processo';
import { ProcessoViewModel } from '../../models/ProcessoViewModel';
import { ProcessoQueue } from "../../models/ProcessoQueue";

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-round-robin-priority',
  templateUrl: './round-robin-priority.component.html',
  styleUrls: ['./round-robin-priority.component.css']
})
export class RoundRobinPriorityComponent implements OnInit, OnDestroy {

  @Input()
  private quantum: number;
  private processoQueues: ProcessoQueue[];
  private processSenderSubscription: Subscription;
  private coreSenderSubscription: Subscription;
  private cursorQueue: number = 0;

  constructor(private ProcessSenderService: ProcessSenderService,
    private CoreSenderService: CoreSenderService,
    private ProcessSenderToCoreService: ProcessSenderToCoreService,
    private AlocarMemoriaService: AlocarMemoriaService) {

    this.processoQueues = [];
    for (var i = 0; i < 4; i++) {
      this.processoQueues[i] = new ProcessoQueue();
      this.processoQueues[i].Processos = [];
    }

    this.HandleNewProcess = this.HandleNewProcess.bind(this);
    this.addProcessToQueue = this.addProcessToQueue.bind(this);
    this.GetProcessoWithLessPriority = this.GetProcessoWithLessPriority.bind(this);
    this.HandleCoreLivre = this.HandleCoreLivre.bind(this);

  }

  ngOnInit() {
    this.processSenderSubscription = this.ProcessSenderService.handleNewProcess.subscribe(
      (p: ProcessoViewModel) => this.HandleNewProcess(p));

    this.coreSenderSubscription = this.CoreSenderService.handleCoreLivre.subscribe(
      (value: number) => this.HandleCoreLivre(value));
  }

  private HandleNewProcess(p: ProcessoViewModel) {
    if (!p.isGroup) {
      p.Processo.Quantum = this.quantum * (4 - p.Processo.Prioridade);
      this.addProcessToQueue(null, null, p);
    } else {
      p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => {
        v.Quantum = this.quantum * (4 - v.Prioridade);
        this.addProcessToQueue(v, p.color)
      });
    }
  }

  private addProcessToQueue(p: Processo = null, color: string = null, pvm: ProcessoViewModel = null) {

    if (pvm == null) {
      pvm = new ProcessoViewModel();
      pvm.Processo = p;
      pvm.color = color;
    }

    this.processoQueues[pvm.Processo.Prioridade].Processos.push(pvm);
  }

  private HandleCoreLivre(coreIndex: number): void {
    let processo: ProcessoViewModel = null;

    if (this.IsExistProcess()) {
      processo = this.GetProcessoWithLessPriority();
    }else{
      return;
    }
    processo.coreIndex = coreIndex;
    this.AlocarMemoriaService.OnRequisicaoAlocacaoMemoria(processo)
    //this.ProcessSenderToCoreService.OnNewProcessoEscalonado(processo.Processo, processo.coreIndex, processo.color);
  }

  private IsExistProcess(): boolean {
    for (var i = 0; i < this.processoQueues.length; i++) {
      var queue = this.processoQueues[i];
      if (queue.Processos.length > 0)
        return true;
    }
    return false;
  }

  private GetProcessoWithLessPriority(): ProcessoViewModel {
    let processo: ProcessoViewModel = null;
    let queue: ProcessoQueue = undefined;
    let processosVM: ProcessoViewModel[] = undefined;

    while (processo == null) {
      queue = this.processoQueues[this.cursorQueue];
      processosVM = queue.Processos;

      if (processosVM.length > 0) {
        processo = processosVM.shift();
      }

      this.cursorQueue++;

      if (this.cursorQueue >= this.processoQueues.length)
        this.cursorQueue = 0;
    }
    return processo;
  }

  ngOnDestroy() {
    this.processSenderSubscription.unsubscribe();
    this.coreSenderSubscription.unsubscribe();
  }

}