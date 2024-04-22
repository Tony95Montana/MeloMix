import { Artiste } from "./Artiste";
import { Style } from "./Style";

export interface Musique {
    id: number;
    titre: string;
    duree: number;
    annee: number;
    pochette: string;
    Style: Style;
    Artiste: Artiste;
}