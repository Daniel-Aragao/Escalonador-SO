import { Injectable } from '@angular/core';
import { Processo } from "../models/Processo";
import { EProcessState } from '../models/EProcessState';

@Injectable()
export class ProcessFactoryService {
  private contagem: number;
  constructor() { }

   public GenerateProcess(): Processo {
    return this.Generate();
  }

  public GenerateAnyProcess(count: number): Processo[] {
    var processos = new Processo[count]
    for (var i = 0; i < count; i++){
      processos[i] = this.Generate();
    }
    return processos;
  }

  private Generate(): Processo {
    var processo = new Processo();
    processo.PID = this.contagem;

    processo.TDuracao = this.RandomNumber(4, 20);
    processo.TRestante = processo.TDuracao;

    processo.EState = EProcessState.esperando;

    processo.Prioridade = this.RandomNumber(0, 3);
    processo.TDeadline = this.RandomNumber(4, 20);

    this.contagem++;

    return processo;
  }

  private RandomNumber(start, end): number {
    return Math.floor(Math.random() * end) + start;
  }

}
