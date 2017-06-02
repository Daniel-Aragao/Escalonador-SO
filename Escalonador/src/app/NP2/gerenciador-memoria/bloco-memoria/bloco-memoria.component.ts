import { Component, OnInit, Input } from '@angular/core';
import { BlocoMemoria } from '../../../models/BlocoMemoria';
import { BlockNode } from '../../../models/BlockNode';

@Component({
  selector: 'esc-bloco-memoria',
  templateUrl: './bloco-memoria.component.html',
  styleUrls: ['./bloco-memoria.component.css']
})
export class BlocoMemoriaComponent implements OnInit {
  @Input() Bloco: BlocoMemoria;
  @Input() BlocosLivres: BlockNode;

  constructor() { }

  ngOnInit() {
  }

}
