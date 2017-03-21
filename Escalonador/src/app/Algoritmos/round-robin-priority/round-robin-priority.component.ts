import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessSenderService } from '../../services/process-sender.service';
import { Processo } from '../../models/Processo';
import { ProcessoViewModel } from '../../models/ProcessoViewModel';


import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-round-robin-priority',
  templateUrl: './round-robin-priority.component.html',
  styleUrls: ['./round-robin-priority.component.css']
})
export class RoundRobinPriorityComponent implements OnInit, OnDestroy {
  private processo: Processo;
  private processoQueues: ProcessoQueue[];
  private subscription: Subscription;

  constructor(private ProcessSenderService: ProcessSenderService) {
    this.processoQueues = [];
    this.processoQueues[0] = new ProcessoQueue();
    this.processoQueues[1] = new ProcessoQueue();
    this.processoQueues[2] = new ProcessoQueue();
    this.processoQueues[3] = new ProcessoQueue();
  }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.addProccess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));
  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      this.addProcessToQueue(p.Processo);
    } else {
      p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[])=> this.addProcessToQueue(v))
    }
  }

  private addProcessToQueue(p: Processo){
    this.processoQueues[p.Prioridade].Processos.push(p);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

class ProcessoQueue {
  public Processos: Processo[] = [];

}