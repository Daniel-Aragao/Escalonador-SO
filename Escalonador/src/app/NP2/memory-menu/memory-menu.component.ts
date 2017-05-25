import { Component, OnInit } from '@angular/core';
import { MemoryMenuViewModel } from '../../models/MemoryMenuViewModel';

@Component({
  selector: 'esc-memory-menu',
  templateUrl: './memory-menu.component.html',
  styleUrls: ['./memory-menu.component.css']
})
export class MemoryMenuComponent implements OnInit {
  private ViewModel: MemoryMenuViewModel;

  constructor() { 
    this.ViewModel = new MemoryMenuViewModel();
  }

  ngOnInit() {
  }

  public onChangeAlgoritmo(value: number){
    this.ViewModel.algoritmo = value
  }

}
