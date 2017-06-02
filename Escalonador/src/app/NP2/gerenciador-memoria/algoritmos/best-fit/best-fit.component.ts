import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { AlocarMemoriaService } from '../../../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../../../models/AlocarMemoriaViewModel';
import { MemoryMenuViewModel } from '../../../../models/MemoryMenuViewModel';
import { BlocoMemoria } from '../../../../models/BlocoMemoria';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-best-fit',
  templateUrl: './best-fit.component.html',
  styleUrls: ['./best-fit.component.css']
})
export class BestFitComponent implements OnInit, OnDestroy {
  private AlocarMemoriaSubscription: Subscription;

  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter();
  @Input() MemoryViewModel: MemoryMenuViewModel;

  BlocosMemoriaOcupada: BlocoMemoria[];
  BlocosMemoriaLivre: BlocoMemoria[];

  constructor(private AlocarMemoriaService: AlocarMemoriaService) {
    this.HandleNewProcess = this.HandleNewProcess.bind(this);
    console.log('ctor');
    console.log(this.MemoryViewModel) // vai gerar undefined, ctor não recebeu o input ainda
  }

  ngOnInit() {
    this.AlocarMemoriaSubscription = this.AlocarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleNewProcess(a)
    );
    console.log('init');
    console.log(this.MemoryViewModel) // já recebeu o input
  }

  ngOnDestroy() {
    this.AlocarMemoriaSubscription.unsubscribe();
  }

  /**
   * Best fit: Varre a lista de memória livre buscando o bloco igual ou o bloco com menor desperdicio de memória
   * @param a  
   */
  HandleNewProcess(a: AlocarMemoriaViewModel): void {

    // código de gerenciar a memória
    // verificar 

    let blocoLivre = this.ReceberBloco(a.getTamanho());
    if (blocoLivre)
      console.log("ALOCAR O BLOCO LIVRE COM A REQUISICAO");

    if (this.MemoriaDisponivel() < a.getTamanho())
      console.log("SEM MEMORIA!!")

    console.log("CRIAR NOVO BLOCO");
    
    this.ViewModelEmitter.emit(a);
  }

  ReceberBloco(tamanhoRequisicao: number): BlocoMemoria {
    debugger;
    if (!this.BlocosMemoriaLivre)
      return null;

    let blocoMenorMemoria: BlocoMemoria = this.BlocosMemoriaOcupada[0];
    let blocoPerfeito: BlocoMemoria = null;

    this.BlocosMemoriaLivre.forEach(bloco => {
      if (tamanhoRequisicao === bloco.tamanho) {
        blocoPerfeito = bloco;
        return blocoPerfeito;
      }
      if (bloco.tamanho > tamanhoRequisicao && bloco.tamanho < blocoMenorMemoria.tamanho)
        blocoMenorMemoria = bloco;
    });

    if (blocoPerfeito)
      return blocoPerfeito;
    
  }

  MemoriaDisponivel(): Number {

    let count: number = 0;
    this.BlocosMemoriaOcupada.forEach(bloco => {
      count += bloco.tamanho;
    });

    return count;
  }

}
