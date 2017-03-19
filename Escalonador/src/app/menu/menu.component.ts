import { Component, OnInit } from '@angular/core';
import { Processo } from "../model/Processo";
import { MenuViewModel } from "../model/MenuViewModel";

@Component({
  selector: 'esc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  ProcessFactory: ProcessFactory;
  MenuViewModel: MenuViewModel;

  constructor() {
    this.ProcessFactory = new ProcessFactory();
    this.MenuViewModel = new MenuViewModel();
  }

  ngOnInit() {
  }

  public onClickAdicionarProcesso(): void {
    const newProcess = this.ProcessFactory.GenerateProcess();
  }

  public onClickStart(): void {
    const newProcess = this.ProcessFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
  }

}

class ProcessFactory {

  public GenerateProcess(): Processo {
    return new Processo();
  }

  public GenerateAnyProcess(count: number): Processo[] {

    return new Processo[count];
  }
}