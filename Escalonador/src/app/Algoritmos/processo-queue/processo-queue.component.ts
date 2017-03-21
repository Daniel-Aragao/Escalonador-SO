import { Component, OnInit, Input } from '@angular/core';
import { ProcessoViewModel } from '../../models/ProcessoViewModel';

@Component({
  selector: 'esc-processo-queue',
  templateUrl: './processo-queue.component.html',
  styleUrls: ['./processo-queue.component.css']
})

export class ProcessoQueueComponent implements OnInit {
  @Input() processos: ProcessoViewModel[];
  @Input() showDeadline: boolean;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
