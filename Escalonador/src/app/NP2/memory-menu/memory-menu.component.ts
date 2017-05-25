import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MemoryMenuViewModel } from '../../models/MemoryMenuViewModel';

@Component({
  selector: 'esc-memory-menu',
  templateUrl: './memory-menu.component.html',
  styleUrls: ['./memory-menu.component.css']
})
export class MemoryMenuComponent implements OnInit, OnDestroy {
  private ViewModel: MemoryMenuViewModel;
  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter();
  @Input() public running: boolean;

  constructor() { 
  }

  ngOnInit() {
    this.ViewModel = new MemoryMenuViewModel();
    this.ViewModelEmitter.emit(this.ViewModel);
  }

  ngOnDestroy(){
    this.ViewModelEmitter.emit(null);
  }

  public onChangeAlgoritmo(value: number){
    this.ViewModel.algoritmo = value
  }

}
