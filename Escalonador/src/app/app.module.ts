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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProcessadorComponent,
    CoreComponent,
    RoundRobinPriorityComponent,
    LeastTimeToGoComponent,
    AddProccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProcessFactoryService, ProcessSenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
