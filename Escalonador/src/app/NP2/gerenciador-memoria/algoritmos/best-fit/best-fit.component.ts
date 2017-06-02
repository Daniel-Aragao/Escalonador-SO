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
  private MemoriaOcupada: number = 0; // Soma do valor ocupado dos blocos
  private MemoriaOcupadaPorBlocos: number = 0;// Soma do tamanho dos blocos criados
  private NextBlocoId: number = 1; // Contador de ID's

  TodosOsBlocos: BlocoMemoria;// Raiz da lista encadeada de blocos
  UltimoBloco: BlocoMemoria; // Evitar ficar buscando o último bloco da lista

  BlocosLivres: BlockNode; // Raiz da lista encadeada de nó de bloco(a referência da lista "TodosOsBlocos" não deve ser alterada)

  constructor(private AlocarMemoriaService: AlocarMemoriaService) {
    this.HandleRequisicao = this.HandleRequisicao.bind(this);
  }

  ngOnInit() {
    this.MemoriaTotal = this.MemoryViewModel.size;
    
    this.AlocarMemoriaSubscription = this.AlocarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleRequisicao(a)
    );

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
    // debugger;

    // Verificar se tenho memória em bytes
    if(this.hasMemory(a.getRequisicao())){
      // Verificar se tenho blocos livres
      if(this.BlocosLivres) {
        // Caso tenha blocos livres procuro se encaixo em algum
        let blocoPerfeito: BlockNode = this. ReceberMelhorEncaixe(this.BlocosLivres, a.getRequisicao());
        if(blocoPerfeito){
          // achado o bloco perfeito setar valores
          let bloco = blocoPerfeito.value;
          bloco.tamanhoUsado = a.getRequisicao();
          this.MemoriaOcupada += bloco.tamanhoUsado;

          // Adiciona no processo um novo bloco
          a.ProcessoViewModel.Processo.BlocosMemoria.push(bloco);

          // Confirma a alocação de memória
          a.Alocado = true;
        }else{
          // Caso não caiba em nenhum
          // Verificar se tenho espaço para criar um bloco do tamanho da requisição
          if(this.hasSpaceForNewBlock(a.getRequisicao())){
            // Caso tenha cria bloco novo
            this.CriarBloco(a);
          }
        }
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

   ReceberMelhorEncaixe(bloco: BlockNode, tamanhoRequisicao: number): BlockNode {
    if (bloco.value.getTamanho() === tamanhoRequisicao)
      return bloco;
    
    let MelhorEncaixe:BlockNode = bloco;
    let AnteriorEncaixe: BlockNode;

    while(bloco.nextNode){
      let next = bloco.nextNode;

      if(MelhorEncaixe.value.getTamanho() < tamanhoRequisicao || (MelhorEncaixe.value.getTamanho() > next.value.getTamanho())){
        if(next.value.getTamanho() > tamanhoRequisicao){
          MelhorEncaixe = next;
          AnteriorEncaixe = bloco;
        }else if(next.value.getTamanho() == tamanhoRequisicao){
          MelhorEncaixe = next;
          AnteriorEncaixe = bloco;
          break;
        }
      }

      bloco = bloco.nextNode;
    }

    if(MelhorEncaixe.value.getTamanho() < tamanhoRequisicao){
      return null;
    }

    if(AnteriorEncaixe){
      AnteriorEncaixe.nextNode = MelhorEncaixe.nextNode;
    }else{
      this.BlocosLivres = MelhorEncaixe.nextNode;
    }

    MelhorEncaixe.nextNode = null;

    return MelhorEncaixe;
  }

  private hasMemory(requisicao){
    return this.MemoriaTotal > (this.MemoriaOcupada + requisicao);
  }

  private hasSpaceForNewBlock(requisicao){
    return this.MemoriaTotal > (this.MemoriaOcupadaPorBlocos + requisicao);
  }
  
  private CriarBloco(a: AlocarMemoriaViewModel){
    let novoBloco = new BlocoMemoria(a.getRequisicao());
    novoBloco.BID = this.NextBlocoId++;
    novoBloco.NextBloco = null;
    novoBloco.tamanhoUsado = novoBloco.getTamanho();

    this.MemoriaOcupada += novoBloco.getTamanho();
    this.MemoriaOcupadaPorBlocos += novoBloco.getTamanho();

    // Verifica se existe um último bloco (esse pode ser o primeiro)
    if(this.UltimoBloco){
      this.UltimoBloco.NextBloco = novoBloco;
    }else{
      this.TodosOsBlocos = novoBloco;
    }
    this.UltimoBloco = novoBloco;

    // Adiciona no processo um novo bloco
    a.ProcessoViewModel.Processo.BlocosMemoria.push(novoBloco);

    // Confirma a alocação de memória
    a.Alocado = true;
  }
}