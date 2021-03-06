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
  selector: 'esc-merge-fit',
  templateUrl: './merge-fit.component.html',
  styleUrls: ['./merge-fit.component.css']
})
export class MergeFitComponent implements OnInit {
  private AlocarMemoriaSubscription: Subscription;
  private ProcessKilledSubscriptio: Subscription;

  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter(); // joga a decisão no gerenciador-memoria.component
  @Input() MemoryVM: MemoryMenuViewModel;

  TodosOsBlocos: BlocoMemoria;
  UltimoBloco: BlocoMemoria;

  BlocosLivres: BlockNode;

  constructor(private AlocarMemoriaService: AlocarMemoriaService, private KillProcessService: KillProcessService) {
    this.HandleRequisicao = this.HandleRequisicao.bind(this);
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
    this.MergeAll();
  }

  MoverParaLivre(blocos: BlocoMemoria[]): void {
    //debugger;
    blocos.forEach(bloco => {
      //if (this.Exist(bloco)) {
      let blockNode = new BlockNode();
      blockNode.value = bloco;

      blockNode.nextNode = this.BlocosLivres;
      this.BlocosLivres = blockNode;

      this.MemoryVM.MemoriaOcupada -= bloco.tamanhoUsado;
      bloco.tamanhoUsado = 0;
      //}
    });
  }

  private Exist(bloco: BlocoMemoria): boolean {
    let finded = this.TodosOsBlocos;

    while (finded && finded.BID != bloco.BID) {
      finded = finded.NextBloco;
    }

    return (finded) ? true : false;
  }

  HandleRequisicao(requisicao: AlocarMemoriaViewModel): void {

    let blocoLivre: BlockNode = null;

    if (this.hasMemory(requisicao.getRequisicao())) { // se tiver memoria
      if (this.BlocosLivres) { // se tem blocos livres

        // debugger;
        // Verificar bloco livre >==
        blocoLivre = this.VerificarBlocoLivre(requisicao.getRequisicao()); // pega o primeiro bloco livre que caiba na requisição
        if (!blocoLivre) {
          // Não achou procurar algum bloco livre que tenha a possibilidade de fazer merge e que o tamanho total fique >==
          //blocoLivre = this.BlocoLivreMerged(requisicao.getRequisicao()); // pegar o primeiro bloco livre já "mergiado"

          //if (!blocoLivre) {
            if (this.hasSpaceForNewBlock(requisicao.getRequisicao())) {
              this.CriarBloco(requisicao);
            }
         // }
        }

        if (blocoLivre) {
          if (blocoLivre.value.getTamanho() > requisicao.getRequisicao()) // verifica se tem que dar split
            this.SplitBloco(blocoLivre.value, requisicao.getRequisicao());

          this.MemoryVM.MemoriaOcupada += blocoLivre.value.tamanhoUsado;
          requisicao.ProcessoViewModel.Processo.BlocosMemoria.push(blocoLivre.value);
          requisicao.Alocado = true;
        }

      } else if (this.hasSpaceForNewBlock(requisicao.getRequisicao())) {
        this.CriarBloco(requisicao);
      }
    }
    this.ViewModelEmitter.emit(requisicao);
  }

  private hasSpaceForNewBlock(requisicao) {
    return this.MemoryVM.MemoriaTotal > (this.MemoryVM.MemoriaOcupadaPorBlocos + requisicao);
  }

  private VerificarBlocoLivre(requisicao: number): BlockNode {
    let bloco = this.BlocosLivres;
    
    if (bloco.value.getTamanho() === requisicao) {
      this.BlocosLivres = bloco.nextNode;
      return bloco;
    }

    let MelhorEncaixe: BlockNode = bloco;
    let AnteriorEncaixe: BlockNode;

    while (bloco.nextNode) {
      let next = bloco.nextNode;

      if (MelhorEncaixe.value.getTamanho() < requisicao || (MelhorEncaixe.value.getTamanho() > next.value.getTamanho())) {
        if (next.value.getTamanho() > requisicao) {
          MelhorEncaixe = next;
          AnteriorEncaixe = bloco;
        } else if (next.value.getTamanho() == requisicao) {
          MelhorEncaixe = next;
          AnteriorEncaixe = bloco;
          break;
        }
      }

      bloco = bloco.nextNode;
    }

    if (MelhorEncaixe.value.getTamanho() < requisicao) {
      return null;
    }
    /*
        if (AnteriorEncaixe) {
          AnteriorEncaixe.nextNode = MelhorEncaixe.nextNode;
        } else {
          this.BlocosLivres = MelhorEncaixe.nextNode;
        }
    */
    return MelhorEncaixe;
  }

  private BlocoLivreMerged(requisicao: number): BlockNode {
    let bloco: BlockNode = this.BlocosLivres;

    while (bloco) {
      //debugger;

      if (bloco.value.NextBloco &&
        bloco.value.NextBloco.tamanhoUsado === 0 &&
        bloco.value.getTamanho() + bloco.value.NextBloco.getTamanho() >= requisicao) {
        this.MergeBlocos(bloco.value);
        break;
      }

      bloco = bloco.nextNode;
    }

    return bloco;

  }

  private SplitBloco(bloco: BlocoMemoria, requisicao: number): void {

    let tamanhoNewBlock: number = bloco.getTamanho() - requisicao;
    let newBlock: BlocoMemoria = new BlocoMemoria(tamanhoNewBlock);
    newBlock.BID = this.MemoryVM.NextBlocoId++;
    newBlock.tamanhoUsado = 0;

    // Adicionando o novo bloco nos blocos livres.
    let blockNode = new BlockNode();
    blockNode.value = newBlock;

    blockNode.nextNode = this.BlocosLivres;
    this.BlocosLivres = blockNode;

    newBlock.NextBloco = bloco.NextBloco;
    bloco.NextBloco = newBlock;
    bloco.setTamanho(requisicao);
    bloco.tamanhoUsado = requisicao;

    // bloco antigo sair da livre  
    this.TirarDaLivre(bloco);
    //this.MergeAll();
    
  }

  private MergeBlocos(first: BlocoMemoria) {
    let second = first.NextBloco;
    first.NextBloco = second.NextBloco;
    first.setTamanho(first.getTamanho() + second.getTamanho());

    this.TirarDaLivre(second)

    this.MergeAll();
    
  }

  private MergeAll(): void {
    //debugger;

    let bloco = this.BlocosLivres;
      while (bloco) {
        if (bloco.value.NextBloco && bloco.value.NextBloco.tamanhoUsado == 0)
          this.MergeBlocos(bloco.value);
        else
          bloco = bloco.nextNode;
      }

  }

  private TirarDaLivre(bloco: BlocoMemoria) {
    let b = this.BlocosLivres;

    if (b.value.BID === bloco.BID)
      this.BlocosLivres = this.BlocosLivres.nextNode;
    else {

      //debugger;
      while (b.nextNode && b.nextNode.value.BID != bloco.BID) {
        b = b.nextNode;
      }
      if (!b.nextNode) {
        b = null;
      }
      if (b.nextNode.nextNode) {
        b.nextNode = b.nextNode.nextNode;
      }
      else {
        b.nextNode = null;
      }

    }
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

  private hasMemory(requisicao) {
    return this.MemoryVM.MemoriaTotal > (this.MemoryVM.MemoriaOcupada + requisicao);
  }
}
