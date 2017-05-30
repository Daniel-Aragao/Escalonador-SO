import { Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import { AlocarMemoriaService } from '../../../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../../../models/AlocarMemoriaViewModel';
import { MemoryMenuViewModel } from '../../../../models/MemoryMenuViewModel';

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

  ngOnDestroy(){
    this.AlocarMemoriaSubscription.unsubscribe();
  }

  HandleNewProcess(a: AlocarMemoriaViewModel): void{

    // código de gerenciar a memória

    this.ViewModelEmitter.emit(a);
  }
}
