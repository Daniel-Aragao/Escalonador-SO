import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessSenderService } from '../../services/process-sender.service';
import { Processo } from '../../models/Processo';
import { ProcessoViewModel } from '../../models/ProcessoViewModel';


import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'esc-round-robin-priority',
  templateUrl: './round-robin-priority.component.html',
  styleUrls: ['./round-robin-priority.component.css']
})
export class RoundRobinPriorityComponent implements OnInit, OnDestroy {
  private processo: Processo;
  private subscription: Subscription;

  constructor(private ProcessSenderService: ProcessSenderService) { }

  ngOnInit() {
    this.subscription = this.ProcessSenderService.addProccess.subscribe((p: ProcessoViewModel) => this.addToLine(p));
  }

  private addToLine(p: ProcessoViewModel) {
    if (!p.isGroup) {
      this.processo = p.Processo;      
    } else {
      
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
