import { Component, OnInit, Input } from '@angular/core';
import { ProcessSenderService } from '../services/process-sender.service';
import { ProcessoViewModel } from '../models/ProcessoViewModel';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-processador',
  templateUrl: './processador.component.html',
  styleUrls: ['./processador.component.css']
})
export class ProcessadorComponent implements OnInit {

  @Input()
  private running: boolean;
  private subscription: Subscription;
  private cores: CoreViewModel[] = [];

  constructor(private ProcessSenderService: ProcessSenderService) {

  }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.addProccess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));

    this.Loop();

  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      //this.cores.push(new Pro p);
    } else {
      //p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => this.addProcessToQueue(v, p.color))
    }
  }

  private Loop(): void {
    while(this.running){
      this.VarrerCores();

    }
  }

  private VarrerCores(): void {
    this.cores.forEach(core => {
      if (!core.Processo) {
        // pedir processo
      }
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

class CoreViewModel {
  public Processo: ProcessoViewModel;
}
