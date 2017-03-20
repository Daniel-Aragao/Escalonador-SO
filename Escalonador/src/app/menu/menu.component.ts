import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Processo } from "../models/Processo";
import { MenuViewModel } from "../models/MenuViewModel";
import { ProcessFactoryService } from '../services/process-factory.service';

@Component({
  selector: 'esc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  private MenuViewModel: MenuViewModel;
  private running: boolean;
  private newProcess: Processo;
  private newProcessInfo: any[];

  @Output() AlgorismoSelecionado = new EventEmitter();
  @Output() AdicionarProcesso = new EventEmitter();

  constructor(private processFactory: ProcessFactoryService) {
    this.MenuViewModel = new MenuViewModel();
  }

  ngOnInit() {
  }

  public onChangeAlgoritmo(valor : number) {
    this.AlgorismoSelecionado.emit(valor);
  }

  public onClickAdicionarProcesso(): void {
    //const newProcess = this.processFactory.GenerateProcess();
    this.newProcess = this.processFactory.GenerateProcess();
    this.newProcessInfo = [];

    for (var p in this.newProcess) {
      this.newProcessInfo.push(
        {
          name: p,
          value: this.newProcess[p]
        });
    }


    this.AdicionarProcesso.emit(this.newProcess);
  }

  public onClickStart(): void {
    this.processFactory.resetPID();
    this.running = true;
    var newProcess = this.processFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
  }

  public onClickStop() {
    this.running = false;
    this.newProcess = null;
    this.newProcessInfo = null;
  }

}