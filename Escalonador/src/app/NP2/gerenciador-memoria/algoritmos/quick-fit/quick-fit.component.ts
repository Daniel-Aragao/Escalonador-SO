import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { AlocarMemoriaService } from '../../../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../../../models/AlocarMemoriaViewModel';
import { MemoryMenuViewModel } from '../../../../models/MemoryMenuViewModel';
import { BlocoMemoria } from '../../../../models/BlocoMemoria';
import { BlockNode } from '../../../../models/BlockNode';
import { KillProcessService } from '../../../../services/kill-process.service';
import { KillProcessViewModel } from "../../../../models/KillProcessViewModel";

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-quick-fit',
  templateUrl: './quick-fit.component.html',
  styleUrls: ['./quick-fit.component.css']
})
export class QuickFitComponent implements OnInit {
  private AlocarMemoriaSubscription: Subscription;
  private ProcessKilledSubscriptio: Subscription;

  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter(); // joga a decisão no gerenciador-memoria.component
  @Input() MemoryVM: MemoryMenuViewModel;

  private TodosOsBlocos: BlocoMemoria;// Raiz da lista encadeada de blocos
  private UltimoBloco: BlocoMemoria; // Evitar ficar buscando o último bloco da lista

  private RequisicoesCounter: RequisicaoCount[];
  private RequisicoesSelecionadas: RequisicaoCount[];

  private BlocosLivres: BlockNode[]; // Raiz da lista encadeada de nó de bloco(a referência da lista "TodosOsBlocos" não deve ser alterada)

  constructor(private AlocarMemoriaService: AlocarMemoriaService, private KillProcessService: KillProcessService) {
    this.HandleRequisicao = this.HandleRequisicao.bind(this);
    this.x = this.x.bind(this);
    this.BlocosLivres = [];
    this.RequisicoesCounter = [];
    this.RequisicoesSelecionadas = [];
  }

  ngOnInit() {
    this.MemoryVM.MemoriaTotal = this.MemoryVM.size;

    this.AlocarMemoriaSubscription = this.AlocarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleRequisicao(a)
    );

    this.ProcessKilledSubscriptio = this.KillProcessService.handleKilledProcess.subscribe(
      (kp: KillProcessViewModel) => this.HandleKilledProcess(kp));

  }

  ngOnDestroy() {
    this.AlocarMemoriaSubscription.unsubscribe();
    this.ProcessKilledSubscriptio.unsubscribe();
  }

  HandleKilledProcess(kp: KillProcessViewModel) {
    this.MoverParaLivre(kp.ProcessoViewModel.Processo.BlocosMemoria);
  }

  MoverParaLivre(blocos: BlocoMemoria[]): void {    
    // blocos.forEach(bloco => {
    //   let blockNode = new BlockNode();
    //   blockNode.value = bloco;

    //   blockNode.nextNode = this.BlocosLivres;
    //   this.BlocosLivres = blockNode;

    //   this.MemoryVM.MemoriaOcupada -= bloco.tamanhoUsado;
    //   bloco.tamanhoUsado = 0;
    // });
  }

  HandleRequisicao(requisicao: AlocarMemoriaViewModel): void {
    if (this.hasMemory(requisicao.getRequisicao())) {
      if (this.HasBlocosLivres()) {
        let blocoPerfeito: BlockNode = this.ReceberEncaixeMaisRapido(requisicao.getRequisicao());

        if (blocoPerfeito) {
          let bloco = blocoPerfeito.value;
          bloco.tamanhoUsado = requisicao.getRequisicao();
          this.MemoryVM.MemoriaOcupada += bloco.tamanhoUsado;

          requisicao.ProcessoViewModel.Processo.BlocosMemoria.push(bloco);
          requisicao.Alocado = true;
        } else {
          if (this.hasSpaceForNewBlock(requisicao.getRequisicao())) {
            this.CriarBloco(requisicao);
          }
        }
      } else {
        if (this.hasSpaceForNewBlock(requisicao.getRequisicao())) {
          this.CriarBloco(requisicao);
        }
      }
    }

    this.addRequisicao(requisicao.getRequisicao())

    if(this.MemoryVM.intervalo <= ++this.MemoryVM.qtdRequisicoes){
      this.Recalcular();
      this.MemoryVM.qtdRequisicoes = 0;
      this.RequisicoesCounter = [];
    }

    this.ViewModelEmitter.emit(requisicao);
  }

  ReceberEncaixeMaisRapido(tamanhoRequisicao: number): BlockNode {
    let blocosLivres = this.BlocosLivres;
    let retorno :BlockNode = null;
    this.BlocosLivres.forEach((element, index) => {
      if(element && element.value.getTamanho() == tamanhoRequisicao && index != 0){
        retorno = element;
        blocosLivres[index] = element.nextNode;
      }
    });
    
    if(!retorno && this.BlocosLivres[0]){
      let bloco = this.BlocosLivres[0];
      while(bloco){
        if(bloco.value.getTamanho() >= tamanhoRequisicao){
          retorno = bloco;
          this.BlocosLivres[0] = bloco.nextNode;
          break;
        }
        bloco = bloco.nextNode;
      }
    }

    return retorno;
  }

  private Recalcular(){
    let blocosLivres = this.BlocosLivres;

    this.BlocosLivres.forEach((element, index) => {
      if(index != 0 && element){
        let bloco = blocosLivres[0];
        let ultimoElement = element;

        while(ultimoElement.nextNode){          
          ultimoElement = ultimoElement.nextNode;
        }

        blocosLivres[0] = element;
        ultimoElement.nextNode = bloco; 
      }
    });

    this.RequisicoesCounter.sort((a, b): number =>{
      if(a.Valor < b.Valor){
        return 1;
      }else if(a.Valor > b.Valor){
        return -1;
      }
      return 0;
    });

    let qtd: number = this.MemoryVM.qtdLista;
    this.RequisicoesSelecionadas = [];
    let requisicoesSelecionadas = this.RequisicoesSelecionadas;

    this.RequisicoesCounter.forEach((element, index) => {
      if(index < qtd){
        requisicoesSelecionadas.push({Requisicao: element.Requisicao, Valor: index + 1});

        this.x(blocosLivres[0], blocosLivres[index + 1]);
      }
    });
  }
  //lista livre undefined...

  private x(generico: BlockNode, especifico: BlockNode){
    //especifico 
  }
  private HasBlocosLivres(): boolean{
    var any : boolean = false;

    this.BlocosLivres.forEach(element => {
      if(element){
        any = true;
      }
    });

    return any;
  }

  private hasMemory(requisicao) {
    return this.MemoryVM.MemoriaTotal > (this.MemoryVM.MemoriaOcupada + requisicao);
  }

  private hasSpaceForNewBlock(requisicao) {
    return this.MemoryVM.MemoriaTotal > (this.MemoryVM.MemoriaOcupadaPorBlocos + requisicao);
  }

  private CriarBloco(requisicao: AlocarMemoriaViewModel) {
    let novoBloco = new BlocoMemoria(requisicao.getRequisicao());
    novoBloco.BID = this.MemoryVM.NextBlocoId++;
    novoBloco.NextBloco = null;
    novoBloco.tamanhoUsado = novoBloco.getTamanho();

    this.MemoryVM.MemoriaOcupada += novoBloco.getTamanho();
    this.MemoryVM.MemoriaOcupadaPorBlocos += novoBloco.getTamanho();

    if (this.UltimoBloco) {
      this.UltimoBloco.NextBloco = novoBloco;
    } else {
      this.TodosOsBlocos = novoBloco;
    }
    this.UltimoBloco = novoBloco;

    requisicao.ProcessoViewModel.Processo.BlocosMemoria.push(novoBloco);

    requisicao.Alocado = true;
  }

  private getListaLivreByRequisicao(requisicao: number){
    let retorno :BlockNode = this.BlocosLivres[0];

    this.BlocosLivres.forEach((element, index) => {
      if(element && element.value.getTamanho() == requisicao && index != 0){
        retorno = element;
      }
    });

    return retorno;
  }

  private addRequisicao(requisicao: number){
    var incremented = false;

    this.RequisicoesCounter.forEach(element => {
      if(element.Requisicao == requisicao){
        element.Valor++;
        incremented = true;
      }
    });

    if(!incremented){
      this.RequisicoesCounter.push({Requisicao: requisicao, Valor: 1});
    }
  }

}

class RequisicaoCount{
  public Requisicao: number;
  public Valor: number;
}