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

  MemoriasOcupadas: BlocoMemoria;/* tem que ter essa lista de ocupados? */
  MemoriasLivres: BlocoMemoria; /* qual será o objeto da memoria? (isso seria tipo uma lista de bloco de memoria)*/

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
    debugger;

    let blocoMemoriaLivre: BlocoMemoria = null;

    if (this.MemoriasLivres) {
      let blocoPerfeito: BlocoMemoria = this.ReceberBlocoPerfeito(this.MemoriasOcupadas, a.getTamanho());

    }
    this.ViewModelEmitter.emit(a);
  }

  ReceberBlocoPerfeito(bloco: BlocoMemoria, tamanhoRequisicao: number): BlocoMemoria {
    if (bloco.tamanho === tamanhoRequisicao)
      return bloco;

    if (bloco.NextBloco)
      return this.ReceberBlocoPerfeito(bloco.NextBloco, tamanhoRequisicao)
    else
      return bloco;
  }

}
