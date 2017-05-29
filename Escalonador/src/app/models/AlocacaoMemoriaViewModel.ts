export class AlocacaoMemoriaViewModel {

    constructor(private processoId: number, private tamanhoAlocacao: number) {        
        this.tamanhoAlocacao = tamanhoAlocacao;
        this.processoId = processoId;
    }

    public getTamanho(): number{
        return this.tamanhoAlocacao;
    }

    public getPID(): number{
        return this.processoId;
    }
}