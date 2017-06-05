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
    this.genericoToEspecifico = this.genericoToEspecifico.bind(this);
    this.getIndexListaLivre = this.getIndexListaLivre.bind(this);
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
    //debugger;

    let BlocosLivres = this.BlocosLivres;
    let MemoryVM = this.MemoryVM;

    blocos.forEach(bloco => { // pra cada bloco
          console.log("aqui")
      
      let arrayIndex: number = this.getIndexListaLivre(bloco.getTamanho()); // pegar o index da lista correta

      let blockNode = new BlockNode();
      blockNode.value = bloco;

      blockNode.nextNode = BlocosLivres[arrayIndex];
      BlocosLivres[arrayIndex] = blockNode;

      MemoryVM.MemoriaOcupada -= bloco.tamanhoUsado;
      bloco.tamanhoUsado = 0;
    });
  }

  private getIndexListaLivre(tamanho: number): number {
    let index = 0;

    this.RequisicoesSelecionadas.forEach(requisicao => {
          console.log("aqui")
      
      if (tamanho === requisicao.Requisicao) { 
        index = requisicao.Valor;
      }
    });

    return index;

  }

  HandleRequisicao(requisicao: AlocarMemoriaViewModel): void {
    if (this.hasMemory(requisicao.getRequisicao())) {
      if (this.HasBlocosLivres()) {
        let blocoPerfeito: BlocoMemoria = this.ReceberEncaixeMaisRapido(requisicao.getRequisicao());

        if (blocoPerfeito) {
          let bloco = blocoPerfeito;
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

    if (this.MemoryVM.intervalo <= ++this.MemoryVM.qtdRequisicoes) {
      this.Recalcular();
      this.MemoryVM.qtdRequisicoes = 0;
      this.RequisicoesCounter = [];
    }

    this.ViewModelEmitter.emit(requisicao);
  }

  ReceberEncaixeMaisRapido(tamanhoRequisicao: number): BlocoMemoria {
    let blocosLivres = this.BlocosLivres;
    let retorno: BlockNode = null;

    let arrayIndex: number = this.getIndexListaLivre(tamanhoRequisicao); // pegar o index da lista correta

    let lista = blocosLivres[arrayIndex];

    if(!lista){
      return null;
    }

    if(arrayIndex){
      blocosLivres[arrayIndex] = lista.nextNode;
      return lista.value;
    }else{
      let bloco = lista;
      let blocoPai = null;
      while(bloco){
          console.log("aqui") // loop infinito
        
        if(bloco.value.getTamanho() >= tamanhoRequisicao){
          break;
        }
        blocoPai = bloco;
        bloco = bloco.nextNode;
      }

      if(!bloco){
        return null;
      }

      if(blocoPai){
        blocoPai.nextNode = bloco.nextNode;
      }else{
        blocosLivres[0] = bloco.nextNode;
      }

      return bloco ? bloco.value : null;
    }
  }

  private Recalcular() {
    let blocosLivres = this.BlocosLivres;

    this.BlocosLivres.forEach((element, index) => {
          console.log("aqui")
      
      if (index != 0 && element) {
        let bloco = blocosLivres[0];
        let ultimoElement = element;
        let i = 0;
        while (ultimoElement.nextNode) {
          console.log("aqui") // loop infinito
          if(i++ > 100){debugger;break;}
          ultimoElement = ultimoElement.nextNode;
        }

        blocosLivres[0] = element;
        ultimoElement.nextNode = bloco;
      }
    });

    this.RequisicoesCounter = this.RequisicoesCounter.sort((a, b): number => {
      if (a.Valor < b.Valor) {
        return 1;
      } else if (a.Valor > b.Valor) {
        return -1;
      }
      return 0;
    });

    let qtd: number = this.MemoryVM.qtdLista;
    this.RequisicoesSelecionadas = [];
    let requisicoesSelecionadas = this.RequisicoesSelecionadas;

    this.RequisicoesCounter.forEach((element, index) => {
          console.log("aqui")
      
      if (element && index < qtd) {
        requisicoesSelecionadas.push({ Requisicao: element.Requisicao, Valor: index + 1 });

        this.genericoToEspecifico(element.Requisicao, index + 1);
      }
    });

    this.RequisicoesCounter = []
  }
  
  private genericoToEspecifico(requisicao: number, index: number) {
    let genericoRaiz = this.BlocosLivres[0];
    let paiGRaiz = null;
    let i= 0;
    while (genericoRaiz) {
          console.log("aqui")// loop infinito - causa os outros loops - já foi corrigido uma das causas (solução: novoGenericoRaiz)
      if(i++ > 100){debugger;break;}
      if (genericoRaiz.value.getTamanho() == requisicao) {
        let novoGenericoRaiz = null;
        if (paiGRaiz) {
          paiGRaiz.nextNode = genericoRaiz.nextNode;
          novoGenericoRaiz = genericoRaiz.nextNode;
        } else {
          this.BlocosLivres[0] = genericoRaiz.nextNode;
          novoGenericoRaiz = genericoRaiz.nextNode;
        }

        genericoRaiz.nextNode = this.BlocosLivres[index];
        this.BlocosLivres[index] = genericoRaiz;

        genericoRaiz = novoGenericoRaiz;

      }else{
        paiGRaiz = genericoRaiz;
        genericoRaiz = genericoRaiz.nextNode;
      }
    }
  }

  private HasBlocosLivres(): boolean {
    var any: boolean = false;

    this.BlocosLivres.forEach(element => {
          console.log("aqui")
      
      if (element) {
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

  private addRequisicao(requisicao: number) {
    var incremented = false;

    this.RequisicoesCounter.forEach(element => {
          console.log("aqui")
      
      if (element.Requisicao == requisicao) {
        element.Valor++;
        incremented = true;
      }
    });

    if (!incremented) {
      this.RequisicoesCounter.push({ Requisicao: requisicao, Valor: 1 });
    }
  }

}

class RequisicaoCount {
  public Requisicao: number;
  public Valor: number;
}