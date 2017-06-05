export class MemoryMenuViewModel {
    public size: number;
    public algoritmo: number;
    public qtdLista: number;
    public intervalo: number;
    public qtdRequisicoes: number = 0;

    public MemoriaTotal: number;// Capacidade total da memória
    public MemoriaOcupada: number = 0; // Soma do valor ocupado dos blocos
    public MemoriaOcupadaPorBlocos: number = 0;// Soma do tamanho dos blocos criados
    public NextBlocoId: number = 1; // Contador de ID's

    constructor() {
        this.algoritmo = 1;
    }

    MemoriaAlocadaPercent() {
        return (100 * (this.MemoriaOcupada / this.MemoriaTotal)).toFixed(2);
    }

    MemoriaAlocadaBlocoPercent() {
        return (100 * (this.MemoriaOcupadaPorBlocos / this.MemoriaTotal)).toFixed(2);
    }

    QuantidadeRequisicaoPercent() {
        return (100 * (this.qtdRequisicoes / this.intervalo)).toFixed(2);
    }

}