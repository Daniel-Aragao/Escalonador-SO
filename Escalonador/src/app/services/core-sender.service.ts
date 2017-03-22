import { Injectable } from '@angular/core';
import { ProcessoViewModel } from "../models/ProcessoViewModel";

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoreSenderService {
  private sinalToLivreSource = new ReplaySubject<boolean>(1);
  public sinalToLivre: Observable<boolean> = this.sinalToLivreSource.asObservable();

  public SinalToLivre(): void {
    this.sinalToLivreSource.next(true);
  }

}
