// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProcessadorComponent } from './processador/processador.component';
import { CoreComponent } from './processador/core/core.component';
import { RoundRobinPriorityComponent } from './Algoritmos/round-robin-priority/round-robin-priority.component';
import { LeastTimeToGoComponent } from './Algoritmos/least-time-to-go/least-time-to-go.component';
import { AddProccessComponent } from './menu/add-proccess/add-proccess.component';
import { ProcessoQueueItemComponent } from './Algoritmos/processo-queue/processo-queue-item/processo-queue-item.component';
import { ProcessoQueueComponent } from './Algoritmos/processo-queue/processo-queue.component';
import { ConcluidosComponent } from './concluidos/concluidos.component';
import { MemoryMenuComponent } from './NP2/memory-menu/memory-menu.component';
import { GerenciadorMemoriaComponent } from './NP2/gerenciador-memoria/gerenciador-memoria.component';
import { BestFitComponent } from './NP2/gerenciador-memoria/algoritmos/best-fit/best-fit.component';
import { MergeFitComponent } from './NP2/gerenciador-memoria/algoritmos/merge-fit/merge-fit.component';
import { QuickFitComponent } from './NP2/gerenciador-memoria/algoritmos/quick-fit/quick-fit.component';
import { MemoriaComponent } from './NP2/gerenciador-memoria/memoria/memoria.component';
import { BlocoMemoriaComponent } from './NP2/gerenciador-memoria/bloco-memoria/bloco-memoria.component';

// Services
import { ProcessFactoryService } from './services/process-factory.service';
import { ProcessSenderService } from './services/process-sender.service';
import { ProcessSenderToCoreService } from './services/process-sender-core.service';
import { CoreSenderService } from './services/core-sender.service';
import { KillProcessService } from './services/kill-process.service';
import { AlocarMemoriaService } from './services/alocar-memoria.service';
import { RespostaMemoriaService } from './services/resposta-memoria.service';
import { EmptyOfProcessService } from './services/empty-of-process.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProcessadorComponent,
    CoreComponent,
    RoundRobinPriorityComponent,
    LeastTimeToGoComponent,
    AddProccessComponent,
    ProcessoQueueComponent,
    ProcessoQueueItemComponent,
    ConcluidosComponent,
    MemoryMenuComponent,
    GerenciadorMemoriaComponent,
    BestFitComponent,
    MergeFitComponent,
    QuickFitComponent,
    MemoriaComponent,
    BlocoMemoriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ProcessFactoryService, 
    ProcessSenderService, 
    CoreSenderService, 
    ProcessSenderToCoreService,
    KillProcessService,
    AlocarMemoriaService,
    RespostaMemoriaService,
    EmptyOfProcessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
