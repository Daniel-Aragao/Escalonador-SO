import { Component, OnInit } from '@angular/core';
import { ProcessFactoryService } from '../../services/process-factory.service';
import { ProcessSenderService } from '../../services/process-sender.service';
import { Processo } from "../../models/Processo";


@Component({
  selector: 'esc-add-proccess',
  templateUrl: './add-proccess.component.html',
  styleUrls: ['./add-proccess.component.css']
})
export class AddProccessComponent implements OnInit {
  newProcess: NewProcessViewModel[];

  constructor(private processFactory: ProcessFactoryService, private processSender: ProcessSenderService) { 
    this.newProcess = [];
  }

  ngOnInit() {
  }

  public onClickAdicionarProcesso(): void {
    var newProcess = this.processFactory.GenerateProcess();
    var newProcessInfo = [];

    for (var p in newProcess) {
      newProcessInfo.push(
        {
          name: p,
          value: newProcess[p]
        });
    }
    var np = new NewProcessViewModel()
    np.processo = newProcess;
    np.processoInfo = newProcessInfo;

    this.newProcess.push(np);
    //this.processSender.SendProcess(newProcess.processo);
  }

  public onClickEnviarProcessos() {
    if (this.newProcess.length == 1) {
      this.processSender.SendProcess(this.newProcess[0].processo, "blue");
    } else if (this.newProcess.length > 1) {
      var processos: Processo[] = [];

      this.newProcess.forEach((v, i, a) => processos.push(v.processo));

      this.processSender.SendManyProcess(processos, "blue");      
    }
    this.newProcess = [];
  }

}

class NewProcessViewModel{
  public processo: Processo;
  public processoInfo: any[];
}
