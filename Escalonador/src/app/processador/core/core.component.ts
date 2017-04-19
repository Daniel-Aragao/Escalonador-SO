import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProcessoViewModel } from "../../models/ProcessoViewModel";

@Component({
  selector: 'esc-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit, OnDestroy {

  @Input() core: ProcessoViewModel;
  @Input() showDeadline: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.core = new ProcessoViewModel;
    this.showDeadline = false;
  }

}
