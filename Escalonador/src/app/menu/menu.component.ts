import { Component, OnInit } from '@angular/core';
import { Processo } from "../models/Processo";
import { MenuViewModel } from "../models/MenuViewModel";
import { ProcessFactoryService } from '../services/process-factory.service';

@Component({
  selector: 'esc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  MenuViewModel: MenuViewModel;

  constructor(private processFactory: ProcessFactoryService) {
    this.MenuViewModel = new MenuViewModel();
  }

  ngOnInit() {
  }

  public onClickAdicionarProcesso(): void {
    const newProcess = this.processFactory.GenerateProcess();
  }

  public onClickStart(): void {
    const newProcess = this.processFactory.GenerateAnyProcess(this.MenuViewModel.QuantidadeProcessosIniciais);
  }

}