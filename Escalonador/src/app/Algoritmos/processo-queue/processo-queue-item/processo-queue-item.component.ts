import { Component, OnInit, Input } from '@angular/core';
import { Processo } from '../../../models/Processo';
import { ProcessoViewModel } from '../../../models/ProcessoViewModel';

@Component({
  selector: 'esc-processo-queue-item',
  templateUrl: './processo-queue-item.component.html',
  styleUrls: ['./processo-queue-item.component.css']
})
export class ProcessoQueueItemComponent implements OnInit {

  @Input() processo: ProcessoViewModel;
  @Input() showDeadline: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
