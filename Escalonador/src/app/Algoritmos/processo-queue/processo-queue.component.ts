import { Component, OnInit, Input } from '@angular/core';
import { Processo } from '../../models/Processo';

@Component({
  selector: 'esc-processo-queue',
  templateUrl: './processo-queue.component.html',
  styleUrls: ['./processo-queue.component.css']
})

export class ProcessoQueueComponent implements OnInit {
  @Input()
  processos: Processo[];

  constructor() { 
    
  }

  ngOnInit() {
    this.processos = [];
  }

}
