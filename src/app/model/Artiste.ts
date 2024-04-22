import { Musique } from "./Musique";

export interface Artiste {
    id: number;
    nom: string;
    image: string;
    Musique: Musique[];
}