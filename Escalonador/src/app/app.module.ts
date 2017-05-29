import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProcessadorComponent } from './processador/processador.component';
import { CoreComponent } from './processador/core/core.component';
import { RoundRobinPriorityComponent } from './Algoritmos/round-robin-priority/round-robin-priority.component';
import { LeastTimeToGoComponent } from './Algoritmos/least-time-to-go/least-time-to-go.component';
import { AddProccessComponent } from './menu/add-proccess/add-proccess.component';

import { ProcessFactoryService } from './services/process-factory.service';
import { ProcessSenderService } from './services/process-sender.service';
import { ProcessSenderToCoreService } from './services/process-sender-core.service';
import { CoreSenderService } from './services/core-sender.service';
import { ProcessoQueueComponent } from './Algoritmos/processo-queue/processo-queue.component';
import { ProcessoQueueItemComponent } from './Algoritmos/processo-queue/processo-queue-item/processo-queue-item.component';
import { KillProcessService } from './services/kill-process.service';
import { ConcluidosComponent } from './concluidos/concluidos.component';
import { MemoryMenuComponent } from './NP2/memory-menu/memory-menu.component';
import { AlocarMemoriaService } from './services/alocar-memoria.service';
import { GerenciadorMemoriaComponent } from './NP2/gerenciador-memoria/gerenciador-memoria.component';

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
    GerenciadorMemoriaComponent
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
    AlocarMemoriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
