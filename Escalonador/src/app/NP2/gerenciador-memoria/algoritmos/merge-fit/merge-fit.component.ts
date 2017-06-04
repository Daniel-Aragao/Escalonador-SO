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
    this.MergeBlocos();
  }

  MoverParaLivre(blocos: BlocoMemoria[]): void {
    //debugger;
    blocos.forEach(bloco => {
      if (this.Exist(bloco)) {
        let blockNode = new BlockNode();
        blockNode.value = bloco;

        blockNode.nextNode = this.BlocosLivres;
        this.BlocosLivres = blockNode;

        this.MemoryVM.MemoriaOcupada -= bloco.tamanhoUsado;
        bloco.tamanhoUsado = 0;
      }
    });
  }

  private Exist(bloco: BlocoMemoria): boolean {
    let finded = this.TodosOsBlocos;

    while (finded.BID != bloco.BID) {
      finded = finded.NextBloco;
    }

    return (finded) ? true : false;
  }

  HandleRequisicao(requisicao: AlocarMemoriaViewModel): void {

    if (this.hasMemory(requisicao.getRequisicao())) {
      if (this.BlocosLivres) {
        let blocoPerfeito: BlocoMemoria = this.ReceberEncaixe(requisicao.getRequisicao());

        if (blocoPerfeito) {
          blocoPerfeito.tamanhoUsado = requisicao.getRequisicao();
          this.MemoryVM.MemoriaOcupada += blocoPerfeito.tamanhoUsado;

          requisicao.ProcessoViewModel.Processo.BlocosMemoria.push(blocoPerfeito.Clone());
          requisicao.Alocado = true;
          this.TirarDaLivre(blocoPerfeito);

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

    this.ViewModelEmitter.emit(requisicao);
  }

  private hasSpaceForNewBlock(requisicao) {
    return this.MemoryVM.MemoriaTotal > (this.MemoryVM.MemoriaOcupadaPorBlocos + requisicao);
  }

  private ReceberEncaixe(requisicao: number): BlocoMemoria {
    let bloco: BlocoMemoria = this.TodosOsBlocos;

    while (bloco) {
      if (bloco.tamanhoUsado === 0) {

        if (bloco.getTamanho() === requisicao) {
          break;
        } else {
          if (bloco.getTamanho() > requisicao) {
            this.SplitBloco(bloco, requisicao);
            break;
          }
        }
      }
      bloco = bloco.NextBloco;
    }

    return bloco;
  }

  private SplitBloco(bloco: BlocoMemoria, requisicao: number): void {
    let tamanhoNewBlock: number = bloco.getTamanho() - requisicao;
    let newBlock: BlocoMemoria = new BlocoMemoria(tamanhoNewBlock);
    newBlock.BID = this.MemoryVM.NextBlocoId++;
    newBlock.tamanhoUsado = tamanhoNewBlock;

    this.TirarDaLivre(bloco.NextBloco);

    newBlock.NextBloco = bloco.NextBloco;
    bloco.NextBloco = newBlock;
    bloco.setTamanho(requisicao);
  }

  private MergeBlocos() {
    let bloco = this.TodosOsBlocos;

    while (bloco.NextBloco) {
      if (bloco.tamanhoUsado === 0 && bloco.NextBloco.tamanhoUsado === 0) {
        //debugger;

        let tamanhoTotalMerged = bloco.getTamanho() + bloco.NextBloco.getTamanho();
        bloco.setTamanho(tamanhoTotalMerged);

        this.TirarDaLivre(bloco.NextBloco);

        if (bloco.NextBloco.NextBloco)
          bloco.NextBloco = bloco.NextBloco.NextBloco;
        else
          bloco.NextBloco = null;
      }
      if (bloco.NextBloco)
        bloco = bloco.NextBloco;
    }

  }

  private TirarDaLivre(bloco: BlocoMemoria) {
    setTimeout.bind(this)(() => {
      let b = this.BlocosLivres;

      if (b.value.BID === bloco.BID)
        this.BlocosLivres = this.BlocosLivres.nextNode;
      else {

        //debugger;
        while (b.nextNode && b.nextNode.value.BID != bloco.BID) {
          b = b.nextNode;
        }

        if (b.nextNode.nextNode) {
          b.nextNode = b.nextNode.nextNode;
        }
        else {
          b.nextNode = null;
        }

      }

    }, 2);

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
