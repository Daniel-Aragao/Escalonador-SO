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
  @Output() RunningChanged = new EventEmitter();

  constructor(private processFactory: ProcessFactoryService, private processSender: ProcessSenderService) {
    this.MenuViewModel = new MenuViewModel();
  }

  ngOnInit() {
  }

  public onChangeAlgoritmo(valor : number) {
    this.AlgoritmoSelecionado.emit(valor);
  }

  public onClickStart(): void {
    this.processFactory.resetPID();
    this.running = true;
    this.RunningChanged.emit(this.running);

    var newProcess = this.processFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
    this.processSender.SendManyProcess(newProcess, "red");
  }

  public onClickStop() {
    this.running = false;
    this.RunningChanged.emit(this.running);
  }

}