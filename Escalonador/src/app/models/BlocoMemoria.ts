export class BlocoMemoria{
    public BID: number;
    public tamanhoUsado: number;
    public NextBloco: BlocoMemoria;
    protected tamanho: number;
    
    constructor(tamanho: number) {
        this.tamanho = tamanho;
    }
    public getTamanho(){
        return this.tamanho;
    }

    public getPercentOcupado(){
        return (this.tamanhoUsado/this.tamanho) * 100
    }

    public getPercentNaoOcupado(){
        return 100 - ((this.tamanhoUsado/this.tamanho) * 100)
    }
}