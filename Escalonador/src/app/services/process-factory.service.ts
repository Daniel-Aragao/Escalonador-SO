import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { ProcessoViewModel } from "../models/ProcessoViewModel";
import { EProcessState } from '../models/EProcessState';



@Injectable()
export class ProcessFactoryService {
  private contagem: number;

  constructor() {
    this.resetPID();
  }
  
  public resetPID() {
    this.contagem = 0;
  }

  public GenerateProcess(): Processo {
    return this.Generate();
  }

  public GenerateAnyProcess(count: number): Processo[] {
    var processos: Processo[] = [];
    
    for (var i = 0; i < count; i++){
      processos.push(this.Generate());
    }

    return processos;
  }

  private Generate(): Processo {
    var processo = new Processo();
    processo.PID = this.contagem;

    processo.TDuracao = this.RandomNumber(10, 31);
    processo.TRestante = processo.TDuracao;
    processo.TDeadline = this.RandomNumber(4, 21);
    processo.QuantidadeBytes = this.QuantidadeBytes();

    processo.Prioridade = this.RandomNumber(0, 4);

    processo.EState = EProcessState.esperando;

    this.contagem++;

    return processo;
  }

  public RandomNumber(start, end): number {
    return Math.floor(Math.random() * end) + start;
  }

  public QuantidadeBytes(){
    return this.RandomNumber(32, 1025);
  }

}
