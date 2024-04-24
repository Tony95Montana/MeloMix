import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  url = 'http://localhost:3000/utilisateurs';
  url2 = 'http://localhost:3000/auth/';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<any>(this.url, utilisateur, this.httpOptions);
  }
  connection(username: string, password: string): Observable<any> {
    console.log(username, password);

    return this.http.post<any>(this.url2 + 'login', {
      username: username,
      password: password
      ,
    });
  }
}
