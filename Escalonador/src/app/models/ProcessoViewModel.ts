import { Processo } from "./Processo";

export class ProcessoViewModel{
    public Processo: Processo;
    public isGroup: boolean;
    public color: string;
    // Processo queue deve separar o grupo de processos em vários processos view model
    public GrupoProcessos: Processo[];
}