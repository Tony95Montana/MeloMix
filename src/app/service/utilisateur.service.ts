import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url = "http://localhost:3000/utilisateurs";
  url2 = "http://localhost:3000/auth/";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) { }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<any>(this.url, utilisateur, this.httpOptions);
  }
  connection(mail: string, mdp: string): Observable<any> {
    return this.http.post(this.url2 + "login", { email: mail, mdp: mdp }, this.httpOptions);
  }
}
