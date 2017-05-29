import { Component, OnInit } from '@angular/core';
import { AlocarMemoriaService } from '../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../models/AlocarMemoriaViewModel';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-gerenciador-memoria',
  templateUrl: './gerenciador-memoria.component.html',
  styleUrls: ['./gerenciador-memoria.component.css']
})
export class GerenciadorMemoriaComponent implements OnInit {

  private AlocarMemoriaSubscription: Subscription;

  private memoria = null;

  constructor(private AlocacarMemoriaService: AlocarMemoriaService) {
    this.HandleNewProcess = this.HandleNewProcess.bind(this);
   }

  ngOnInit() {
    this.AlocarMemoriaSubscription = this.AlocacarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleNewProcess(a)
    );

    //this.processSenderSubscription = this.ProcessSenderService.handleNewProcess.subscribe(
      // (p: ProcessoViewModel) => this.HandleNewProcess(p));
  }

  HandleNewProcess(a: AlocarMemoriaViewModel){

  }
  

}
