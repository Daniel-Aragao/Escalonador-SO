import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Processo } from "../models/Processo";
import { MenuViewModel } from "../models/MenuViewModel";
import { MemoryMenuViewModel } from '../models/MemoryMenuViewModel';
import { ProcessFactoryService } from '../services/process-factory.service';
import { ProcessSenderService } from '../services/process-sender.service';

@Component({
  selector: 'esc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  private MenuViewModel: MenuViewModel;
  private MemoryViewModel: MemoryMenuViewModel;
  private running: boolean;
  private algoritmo: number;

  @Output() AlgoritmoSelecionado = new EventEmitter();
  @Output() QuantidadeCores = new EventEmitter();
  @Output() Quantum = new EventEmitter();
  @Output() RunningChanged = new EventEmitter();
  @Output() MemoryViewModelEmitter = new EventEmitter();

  constructor(private processFactory: ProcessFactoryService, private processSender: ProcessSenderService) {
    this.MenuViewModel = new MenuViewModel();
    this.algoritmo = 1;
  }

  ngOnInit() {
  }

  public onChangeAlgoritmo(valor: number) {
    this.AlgoritmoSelecionado.emit(valor);
    this.algoritmo = valor;
  }

  public onGetMemoryViewModel(vm : MemoryMenuViewModel){
    this.MemoryViewModel = vm;
    this.MemoryViewModelEmitter.emit(vm);
  }

  public onClickStart(): void {

    if (this.MenuViewModel.QuantidadeProcessosIniciais <= 0){
      alert('Número de processos deve ser maior que zero');      
    }else if(this.MenuViewModel.QuantidadeCores < 1 || this.MenuViewModel.QuantidadeCores > 64){
      alert('Número de cores deve ser maior que 0 e menor que 65');    
    }else if(this.MenuViewModel.Quantum < 2 || this.MenuViewModel.Quantum > 20){
      alert('Quantum deve ser maior que 1 e menor que 21');
    }else{
      this.processFactory.resetPID();
      this.running = true;

      this.RunningChanged.emit(this.running);
      this.QuantidadeCores.emit(this.MenuViewModel.QuantidadeCores);
      this.Quantum.emit(this.MenuViewModel.Quantum);
      
      var newProcess = this.processFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
      this.processSender.OnNewManyProcess(newProcess, "red");
    }
  }

  public onClickStop() {
    this.running = false;
    this.RunningChanged.emit(this.running);
    this.MenuViewModel = new MenuViewModel();
  }

}