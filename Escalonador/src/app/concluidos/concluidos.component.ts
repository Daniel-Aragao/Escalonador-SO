import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { KillProcessService } from '../services/kill-process.service';

import { ProcessoViewModel } from '../models/ProcessoViewModel';

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
      (p: ProcessoViewModel) => this.HandleKilledProcess(p));
  }

  HandleKilledProcess(p : ProcessoViewModel){
    if(p.finished){
      this.Finished.push(p);
    }else{
      this.Unfinished.push(p);
    }
  }

  ngOnDestroy(){
    this.Finished = [];
    this.Unfinished = [];
  }


}
