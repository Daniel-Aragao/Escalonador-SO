export class MemoryMenuViewModel{
    public size: number;
    public algoritmo: number;
    public qtdLista: number;
    public intervalo: number;

    public MemoriaTotal: number;// Capacidade total da memória
    public MemoriaOcupada: number = 0; // Soma do valor ocupado dos blocos
    public MemoriaOcupadaPorBlocos: number = 0;// Soma do tamanho dos blocos criados
    public NextBlocoId: number = 1; // Contador de ID's
    
    constructor() {
        this.algoritmo = 1;
    }
}