import { ProcessoViewModel } from "../models/ProcessoViewModel"

export class AlocarMemoriaViewModel {
    public ProcessoViewModel: ProcessoViewModel;

    constructor(p: ProcessoViewModel) {
        this.ProcessoViewModel = p;
    }

    public getTamanho(): number{
        return this.ProcessoViewModel.Processo.QuantidadeBytes;
    }

    public getPID(): number{
        return this.ProcessoViewModel.Processo.PID;
    }
}