import { Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import { AlocarMemoriaService } from '../../../../services/alocar-memoria.service';
import { AlocarMemoriaViewModel } from '../../../../models/AlocarMemoriaViewModel';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'esc-best-fit',
  templateUrl: './best-fit.component.html',
  styleUrls: ['./best-fit.component.css']
})
export class BestFitComponent implements OnInit, OnDestroy {
  private AlocarMemoriaSubscription: Subscription;

  @Output("ViewModelEmitter") ViewModelEmitter = new EventEmitter();

  constructor(private AlocarMemoriaService: AlocarMemoriaService) {
    this.HandleNewProcess = this.HandleNewProcess.bind(this);
   }

  ngOnInit() {
    this.AlocarMemoriaSubscription = this.AlocarMemoriaService.handleNewProcess.subscribe(
      (a: AlocarMemoriaViewModel) => this.HandleNewProcess(a)
    );
  }

  ngOnDestroy(){
    this.AlocarMemoriaSubscription.unsubscribe();
  }

  HandleNewProcess(a: AlocarMemoriaViewModel): void{

    // código de gerenciar a memória

    this.ViewModelEmitter.emit(a);
  }
}
