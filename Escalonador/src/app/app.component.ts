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

  private RunningChanged(r: Boolean) {
    this.running = r;
    if (r) {
      
    }
  }
}
