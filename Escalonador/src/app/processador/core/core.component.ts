import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'esc-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  @Input()
  core: any;

  constructor() { }

  ngOnInit() {
  }

}
