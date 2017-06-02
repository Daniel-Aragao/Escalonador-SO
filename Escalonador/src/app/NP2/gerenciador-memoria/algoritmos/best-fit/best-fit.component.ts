import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { AlocarMemoriaService } from '../../../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../../../models/AlocarMemoriaViewModel';
import { MemoryMenuViewModel } from '../../../../models/MemoryMenuViewModel';
import { BlocoMemoria } from '../../../../models/BlocoMemoria';
import { BlockNode } from '../../../../models/BlockNode';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-best-fit',
  templateUrl: './best-fit.component.html',
  styleUrls: ['./best-fit.component.css']
})
export class BestFitComponent implements OnInit, OnDestroy {
  private AlocarMemoriaSubscription: Subscription;

  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter(); // joga a decisão no gerenciador-memoria.component
  @Input() MemoryViewModel: MemoryMenuViewModel; // Input só me serve no ngOnInit, depois descartar uso

  
  private MemoriaTotal: number;// Capacidade total da memória
  private MemoriaOcupada: number; // Soma do valor ocupado dos blocos
  private MemoriaOcupadaPorBlocos: number;// Soma do tamanho dos blocos criados
  private NextBlocoId: number = 1; // Contador de ID's

  TodosOsBlocos: BlocoMemoria;/* tem que ter essa lista de ocupados? */
  UltimoBloco: BlocoMemoria; // Evitar ficar buscando o último bloco da lista

  BlocosLivres: BlockNode; /* qual será o objeto da memoria? (isso seria tipo uma lista de bloco de memoria)*/
  UltimoBlocoLivre: BlockNode; // Evitar ficar buscando o último bloco da lista

  constructor(private AlocarMemoriaService: AlocarMemoriaService) {
    this.HandleRequisicao = this.HandleRequisicao.bind(this);
  }

  ngOnInit() {
    this.AlocarMemoriaSubscription = this.AlocarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleRequisicao(a)
    );

    this.MemoriaTotal = this.MemoryViewModel.size;
  }

  ngOnDestroy() {
    this.AlocarMemoriaSubscription.unsubscribe();
  }

  /**
   * Best fit: Varre a lista de memória livre buscando o bloco igual ou o bloco com menor desperdicio de memória
   * @param a  
   */

  HandleRequisicao(a: AlocarMemoriaViewModel): void {
    // código de gerenciar a memória
    debugger;

    // Verificar se tenho memória em bytes
    if(this.hasMemory(a.getRequisicao())){
      // Verificar se tenho blocos livres
      if(this.BlocosLivres) {
        // Caso tenha blocos livres
        let blocoPerfeito: BlocoMemoria = this. ReceberMelhorEncaixe(this.TodosOsBlocos, a.getRequisicao());
      }else{
        // Caso não tenha blocos livres
        // verificar se tenho espaço para criar um bloco do tamanho da requisição
        if(this.hasSpaceForNewBlock(a.getRequisicao())){
          // Caso tenha cria bloco novo
          this.CriarBloco(a);
        }
      }
    }
    this.ViewModelEmitter.emit(a);
  }

   ReceberMelhorEncaixe(bloco: BlocoMemoria, tamanhoRequisicao: number): BlocoMemoria {
    if (bloco.tamanho === tamanhoRequisicao)
      return bloco;

    if (bloco.NextBloco)
      return this. ReceberMelhorEncaixe(bloco.NextBloco, tamanhoRequisicao)
    else
      return bloco;
  }

  private hasMemory(requisicao){
    return this.MemoriaTotal > (this.MemoriaOcupada + requisicao);
  }

  private hasSpaceForNewBlock(requisicao){
    return this.MemoriaTotal > (this.MemoriaOcupadaPorBlocos + requisicao);
  }
  
  private CriarBloco(a: AlocarMemoriaViewModel){
    let novoBloco = new BlocoMemoria();
    novoBloco.BID = this.NextBlocoId++;
    novoBloco.NextBloco = null;
    novoBloco.tamanho = a.getRequisicao();
    novoBloco.tamanhoUsado = novoBloco.tamanho;

    this.MemoriaOcupada += novoBloco.tamanho;
    this.MemoriaOcupadaPorBlocos += novoBloco.tamanho;

    // Verifica se existe um último bloco (esse pode ser o primeiro)
    if(this.UltimoBloco){
      this.UltimoBloco.NextBloco = novoBloco;
    }
    this.UltimoBloco = novoBloco;

    // Adiciona no processo um novo bloco
    a.ProcessoViewModel.Processo.BlocosMemoria.push(novoBloco);

    // Confirma a alocação de memória
    a.Alocado = true;
  }
}