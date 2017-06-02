import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AlocarMemoriaService } from '../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../models/AlocarMemoriaViewModel';
import { RespostaMemoriaService } from '../../services/resposta-memoria.service';
import { KillProcessService } from '../../services/kill-process.service';

import { ProcessoViewModel } from '../../models/ProcessoViewModel';
import { MemoryMenuViewModel } from '../../models/MemoryMenuViewModel';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-gerenciador-memoria',
  templateUrl: './gerenciador-memoria.component.html',
  styleUrls: ['./gerenciador-memoria.component.css']
})
// essa classe será somente um controller pros algoritmos que serão escolhidos e passados via input
export class GerenciadorMemoriaComponent implements OnInit, OnDestroy {
  private memoria = null;

  @Input() MemoryViewModel: MemoryMenuViewModel;

  constructor(private RespostaMemoriaService: RespostaMemoriaService,
              private KillProcessService: KillProcessService) {
    
   }

  ngOnInit() {
    
  }

  ngOnDestroy(){

  }  

  OnMemoryAlocated(a: AlocarMemoriaViewModel):void{
    if(a.Alocado){
      this.RespostaMemoriaService.OnRespostaAlocacaoMemoria(a);
    }else{
      // matar processo
      this.KillProcessService.OnKillProcess(a.ProcessoViewModel, false);
    }
  }
  

}
