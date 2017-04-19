import { Component } from '@angular/core';
import { Processo } from './models/Processo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private algoritmo: number = 1;
  private processo: Processo;
  private running: Boolean;
  private quantidadeCores: number;
  private quantum: number;

  private RunningChanged(r: Boolean) {
    this.running = r;    
  }
}
