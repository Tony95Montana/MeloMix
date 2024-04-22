import { Utilisateur } from "./Utilisateur";

export interface Playlist {
    id: number;
    nom: string;
    description: string;
    pochette: string;
    Utilisateur: Utilisateur;
    list_musique: string;
}