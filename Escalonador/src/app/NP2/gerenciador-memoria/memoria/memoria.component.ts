import { Component, OnInit, Input } from '@angular/core';
import { BlocoMemoria } from '../../../models/BlocoMemoria';
import { BlockNode } from '../../../models/BlockNode';

@Component({
  selector: 'esc-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.css']
})
export class MemoriaComponent implements OnInit {

  @Input() TodosOsBlocos: BlocoMemoria;
  @Input() ListasBlocosLivres: BlockNode[];

  constructor() { }

  ngOnInit() {
  }

}
