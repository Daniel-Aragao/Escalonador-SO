export class BlocoMemoria{
    public BID: number;
    public tamanhoUsado: number;
    public NextBloco: BlocoMemoria;
    protected tamanho: number;
    
    constructor(tamanho: number) {
        this.tamanho = tamanho;
        this.tamanhoUsado = 0;
        this.BID = 0;
    }
    
    public getTamanho(){
        return this.tamanho;
    }

    public setTamanho(tamanho: number) {
        this.tamanho = tamanho;
    }

    public getPercentOcupado(){
        return (this.tamanhoUsado/this.tamanho) * 100
    }

    public getPercentNaoOcupado(){
        return 100 - ((this.tamanhoUsado/this.tamanho) * 100)
    }

    public Clone(): BlocoMemoria {
        let bloco = new BlocoMemoria(this.tamanho);
        bloco.BID = this.BID;
        bloco.tamanhoUsado = this.tamanhoUsado;

        return bloco;
    }
}