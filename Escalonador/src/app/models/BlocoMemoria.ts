export class BlocoMemoria{
    public BID: number;
    public tamanhoUsado: number;
    public NextBloco: BlocoMemoria;
    protected tamanho: number;

    /**
     *
     */
    constructor(tamanho: number) {
        this.tamanho = tamanho;
    }
    public getTamanho(){
        return this.tamanho;
    }
}