import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musique } from '../model/Musique';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {
  url = "http://localhost:3000/musique";
  client_id = '528e431b3189478aa8c52c1e0835d4cb';
  client_secret = '04520eb069d8431a8ede05f9e4c2b231';
  access_token: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };
  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret),
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Musique[]> {
    return this.http.get<Musique[]>(this.url, this.httpOptions);
  }
  getOne(id: number | string): Observable<Musique> {
    return this.http.get<Musique>(this.url + "/" + id, this.httpOptions);
  }
  searchOne(requette: string): Observable<any> {
    return this.http.get("https://api.spotify.com/v1/search?type=track&q=" + requette, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token.access_token
      })
    });
  }
  getAccessToken() {
    return this.http.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', this.httpOptions2);
  }
}
