import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessFactoryService } from '../../services/process-factory.service';
import { ProcessSenderService } from '../../services/process-sender.service';
import { Processo } from "../../models/Processo";


@Component({
  selector: 'esc-add-proccess',
  templateUrl: './add-proccess.component.html',
  styleUrls: ['./add-proccess.component.css']
})
export class AddProccessComponent implements OnInit, OnDestroy {
  
  newProcess: Processo;
  newProcessInfo: any[];

  constructor(private processFactory: ProcessFactoryService, private processSender: ProcessSenderService) { }

  ngOnInit() {
  }

  public onClickAdicionarProcesso(): void {
    this.newProcess = this.processFactory.GenerateProcess();
    this.newProcessInfo = [];

    for (var p in this.newProcess) {
      this.newProcessInfo.push(
        {
          name: p,
          value: this.newProcess[p]
        });
    }

    this.processSender.SendProcess(this.newProcess);
  }

  ngOnDestroy() {
    alert('destroyied');
  }

}
