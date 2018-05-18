import { ProcessoViewModel } from "./ProcessoViewModel";
import { EAutopsia } from "./EAutopsia";
import { ELocalMorte } from "./ELocalMorte";

export class KillProcessViewModel{
    public ProcessoViewModel: ProcessoViewModel;
    public Finished: boolean;
    public Autopsia: EAutopsia;
    public LocalDeMorte: ELocalMorte;
}