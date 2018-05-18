import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmptyOfProcessService {
  private emptyOfProcess = new ReplaySubject<number>(1);
  public handleEmptyProcess: Observable<number> = this.emptyOfProcess.asObservable();

  public OnEmptyProcess(coreIndex: number): void {
    this.emptyOfProcess.next(coreIndex);
  }

}
