import { Component, OnInit, Input } from '@angular/core';

import { ProcessoViewModel } from "../../models/ProcessoViewModel";

@Component({
  selector: 'esc-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  @Input() core: ProcessoViewModel;
  @Input() showDeadline: boolean;

  constructor() { }

  ngOnInit() {
  }

}
