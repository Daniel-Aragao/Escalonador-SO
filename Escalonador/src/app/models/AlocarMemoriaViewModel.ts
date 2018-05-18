import { ProcessoViewModel } from "../models/ProcessoViewModel"

export class AlocarMemoriaViewModel {
    public ProcessoViewModel: ProcessoViewModel;
    public Alocado: boolean = false;

    constructor(private requisicao: number, p: ProcessoViewModel) {
        this.ProcessoViewModel = p;
    }

    public getRequisicao(): number{
        return this.requisicao;
    }

    public getPID(): number{
        return this.ProcessoViewModel.Processo.PID;
    }
}