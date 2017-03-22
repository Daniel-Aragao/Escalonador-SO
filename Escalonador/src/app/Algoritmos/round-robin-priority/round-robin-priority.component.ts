import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessSenderService } from '../../services/process-sender.service';
import { CoreSenderService } from '../../services/core-sender.service';
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
  private processoQueues: ProcessoQueue[];
  private processSenderSubscription: Subscription;
  private coreSenderSubscription: Subscription;
  private cursorQueue: number = 0;

  constructor(private ProcessSenderService: ProcessSenderService, private CoreSenderService: CoreSenderService) {
    this.processoQueues = [];
    this.processoQueues[0] = new ProcessoQueue();
    this.processoQueues[1] = new ProcessoQueue();
    this.processoQueues[2] = new ProcessoQueue();
    this.processoQueues[3] = new ProcessoQueue();

    this.GerenciadorDeEscalonamento(this);

  }

  ngOnInit() {
    this.processSenderSubscription = this.ProcessSenderService.addProccess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));

    this.coreSenderSubscription = this.CoreSenderService.sinalToLivre.subscribe(this.EnviarProCore);
    

  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      this.addProcessToQueue(null, null, p);
    } else {
      p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => this.addProcessToQueue(v, p.color))
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

  private GerenciadorDeEscalonamento(self: any): void {
    let queue: ProcessoQueue;
    let processosVM: ProcessoViewModel[];

    if (this.ExistsProcess() && this.ExistsCoreLivre()) {

      /*
      if (this.cursorQueue === this.processoQueues.length)
        this.cursorQueue = 0;
        */
      let processo: Processo = this.GetProcessoWithLessPriority();
      console.log(processo);

      /*
      
            console.log(this.cursorQueue);
      
            queue = this.processoQueues[this.cursorQueue];
            processosVM = queue.Processos;
      
            if (queue != undefined && processosVM[0] != undefined) {
              this.ProcessSenderService.SendProcess(processosVM[0].Processo, "red");
              queue.Processos.splice(0, 2);
            }
      */
      //this.cursorQueue++;
    }

    setTimeout(() => {
      self.GerenciadorDeEscalonamento(self);
    }, 1000);
  }

  private ExistsProcess(): boolean {
    let exists: boolean = false;

    this.processoQueues.forEach(queue => {
      if (queue != undefined && queue.Processos != null && queue.Processos.length > 0) {
        exists = true;
        return;
      }

    });

    return exists;
  }

  private ExistsCoreLivre(): boolean {
    return true;
  }

  private GetProcessoWithLessPriority(): Processo {
    if (this.cursorQueue === this.processoQueues.length)
      this.cursorQueue = 0;

    let processo: Processo = null;
    let queue: ProcessoQueue = undefined;
    let processosVM: ProcessoViewModel[] = undefined;

    while (processo == null) {
      queue = this.processoQueues[this.cursorQueue];
      //console.log(queue);
      if (queue != undefined) {
        processosVM = queue.Processos;
        if (processosVM != undefined && processosVM[0] != undefined) {
          processo = processosVM[0].Processo;
          //processosVM.splice(0, 2);
        }
      }
      this.cursorQueue++;
    }

    //this.cursorQueue++;
    return processo;
  }

  private EnviarProCore(isFree: boolean): void {
    if (!isFree)
      return;

    
  }

  ngOnDestroy() {
    this.processSenderSubscription.unsubscribe();
  }

}