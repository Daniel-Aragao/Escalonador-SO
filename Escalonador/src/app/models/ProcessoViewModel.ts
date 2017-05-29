import { Processo } from "./Processo";

export class ProcessoViewModel{
    public Processo: Processo;
    public isGroup: boolean;
    public color: string;
    public coreIndex: number;
    // Processo queue deve separar o grupo de processos em vários processos view model
    public GrupoProcessos: Processo[];
    public finished: boolean;

    public isFake: boolean = false;

    
}