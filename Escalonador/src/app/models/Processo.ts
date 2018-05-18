import { EProcessState } from './EProcessState';
import { BlocoMemoria } from './BlocoMemoria';
import { RandomNumber } from '../services/RandomNumber';

export class Processo {
    public PID: number;
    public TDuracao: number;
    public TRestante: number;
    public TDeadline: number;
    public Prioridade: number;
    public EState: EProcessState;
    public Quantum: number;
    // public QuantidadeBytes: number;
    // NP2
    public BlocosMemoria: BlocoMemoria[] = []; 
    
    constructor() { }

    public QuantidadeBytes(){
        return RandomNumber(32, 1025);
        // return RandomNumber(32, 36);
    }
}