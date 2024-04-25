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
    }),
  };

  constructor(private http: HttpClient) { }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<any>(this.url, utilisateur, this.httpOptions);
  }
  getOne(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + "/" + id, this.httpOptions);
  }
  getTokken(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(this.url2 + 'login', { username: email, password: password }, this.httpOptions);
  }
  connection(tokken: { access_token: string }): Observable<Utilisateur> {
    return this.http.get<any>(this.url2 + 'profile', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + tokken.access_token
      }),
    });
  }
}
