import { Component, OnInit, Input } from '@angular/core';
import { Processo } from '../../../models/Processo';

@Component({
  selector: 'esc-processo-queue-item',
  templateUrl: './processo-queue-item.component.html',
  styleUrls: ['./processo-queue-item.component.css']
})
export class ProcessoQueueItemComponent implements OnInit {

  @Input() processo: Processo;
  @Input() showDeadline: boolean;
  
  constructor() { }

  ngOnInit() {
    console.log(this.processo);
  }

}
