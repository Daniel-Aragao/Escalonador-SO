import { EProcessState } from './EProcessState';

export class Processo {
    public PID: number;
    public TDuracao: number;
    public TRestante: number;
    public TDeadline: number;
    public Prioridade: number;
    public EState: EProcessState;
    
    constructor() { }
}