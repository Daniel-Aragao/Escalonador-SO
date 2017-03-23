import { Component, OnInit, Input } from '@angular/core';
import { ProcessSenderService } from '../services/process-sender.service';
import { CoreSenderService } from '../services/core-sender.service';

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

  constructor(private ProcessSenderService: ProcessSenderService,private CoreSenderService: CoreSenderService) {

  }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.addProccess.subscribe(
      (p: ProcessoViewModel) => this.addToLine(p));


    this.Loop(this);

  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      //this.cores.push(new Pro p);
    } else {
      //p.GrupoProcessos.forEach((v: Processo, i: number, a: Processo[]) => this.addProcessToQueue(v, p.color))
    }
  }

  private Loop(self: any): void {

    //this.VarrerCores();
    console.log('loop')
    if(self.running){
      setTimeout(function () {
        self.Loop(self);
      }, 50);
    }
  }

  private VarrerCores(): void {
    this.cores.forEach((core, index) => {
      if (!core.Processo) {
        // pedir processo
        this.CoreSenderService.SinalToLivre(index);
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
