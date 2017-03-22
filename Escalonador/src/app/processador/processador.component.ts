import { Component, OnInit } from '@angular/core';
import { ProcessSenderService } from '../services/process-sender.service';
import { ProcessoViewModel } from '../models/ProcessoViewModel';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-processador',
  templateUrl: './processador.component.html',
  styleUrls: ['./processador.component.css']
})
export class ProcessadorComponent implements OnInit {
  private subscription: Subscription;
  private cores: any[] = [];

  constructor(private ProcessSenderService: ProcessSenderService) {
  }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.addProccess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));
  }

    private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      this.cores.push(p.Processo);
    } else {
      //p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => this.addProcessToQueue(v, p.color))
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
