import { Musique } from "./Musique";

export interface Style {
    id: number;
    nom: string;
    image: string;
    Musique: Musique[];
}