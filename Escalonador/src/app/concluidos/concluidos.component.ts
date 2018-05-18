import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { KillProcessService } from '../services/kill-process.service';

import { ProcessoViewModel } from '../models/ProcessoViewModel';
import { KillProcessViewModel } from "../models/KillProcessViewModel";

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-concluidos',
  templateUrl: './concluidos.component.html',
  styleUrls: ['./concluidos.component.css']
})
export class ConcluidosComponent implements OnInit, OnDestroy {
  @Input() private showDeadline: boolean;

  private subscription: Subscription;

  private Finished: ProcessoViewModel[] = [];
  private Unfinished: ProcessoViewModel[] = [];

  constructor(private KillProcessService: KillProcessService) { }

  ngOnInit() {
    this.subscription = this.KillProcessService.handleKilledProcess.subscribe(
      (kp: KillProcessViewModel) => this.HandleKilledProcess(kp));
  }

  HandleKilledProcess(kp : KillProcessViewModel){
    if(kp.Finished){
      this.Finished.push(kp.ProcessoViewModel);
    }else{
      this.Unfinished.push(kp.ProcessoViewModel);
    }
  }

  ngOnDestroy(){
    this.Finished = [];
    this.Unfinished = [];
    this.subscription.unsubscribe();
  }


}
