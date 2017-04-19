import { Injectable } from '@angular/core';
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoreSenderService {
  private sinalToLivreSource = new ReplaySubject<number>(1);
  public handleCoreLivre: Observable<number> = this.sinalToLivreSource.asObservable();

  public OnCoreLivre(coreIndex: number): void {
    this.sinalToLivreSource.next(coreIndex);
  }

}
