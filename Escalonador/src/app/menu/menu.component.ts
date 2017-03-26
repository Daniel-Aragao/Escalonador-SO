import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Processo } from "../models/Processo";
import { MenuViewModel } from "../models/MenuViewModel";
import { ProcessFactoryService } from '../services/process-factory.service';
import { ProcessSenderService } from '../services/process-sender.service';

@Component({
  selector: 'esc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  private MenuViewModel: MenuViewModel;
  private running: boolean;

  @Output() AlgoritmoSelecionado = new EventEmitter();
  @Output() QuantidadeCores = new EventEmitter();
  @Output() Quantum = new EventEmitter();
  @Output() RunningChanged = new EventEmitter();

  constructor(private processFactory: ProcessFactoryService, private processSender: ProcessSenderService) {
    this.MenuViewModel = new MenuViewModel();
  }

  ngOnInit() {
  }

  public onChangeAlgoritmo(valor: number) {
    this.AlgoritmoSelecionado.emit(valor);
  }

  public onClickStart(): void {
    this.processFactory.resetPID();
    this.running = true;
    this.RunningChanged.emit(this.running);
    this.QuantidadeCores.emit(this.MenuViewModel.QuantidadeCores);
    this.Quantum.emit(this.MenuViewModel.Quantum);

    if (this.MenuViewModel.QuantidadeProcessosIniciais === 0)
      return;
      
    var newProcess = this.processFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
    this.processSender.OnNewManyProcess(newProcess, "red");
  }

  public onClickStop() {
    this.running = false;
    this.RunningChanged.emit(this.running);
  }

}