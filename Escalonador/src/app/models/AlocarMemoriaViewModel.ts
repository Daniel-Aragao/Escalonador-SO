import { ProcessoViewModel } from "../models/ProcessoViewModel"

export class AlocarMemoriaViewModel {

    constructor(private ProcessoViewModel: ProcessoViewModel) {
    }

    public getTamanho(): number{
        return this.ProcessoViewModel.Processo.QuantidadeBytes;
    }

    public getPID(): number{
        return this.ProcessoViewModel.Processo.PID;
    }
}