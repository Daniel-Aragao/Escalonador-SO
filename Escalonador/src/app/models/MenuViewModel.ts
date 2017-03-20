export class MenuViewModel {

    public QuantidadeProcessosIniciais: number;
    public QuantidadeCores: number;
    public Quantum: number;

    constructor() {
        this.QuantidadeCores = 1;
        this.Quantum = 2;
        this.QuantidadeProcessosIniciais = 0;
    }
}