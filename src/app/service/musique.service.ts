import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musique } from '../model/Musique';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {
  url = "http://localhost:3000/musique";
  client_id = '016076a9328c490e871b53e3c60f8df0';
  client_secret = '281c69495d784945acd547af7da8c6cb';
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
  getOneByName(titre: string): Observable<Musique> {
    return this.http.get<Musique>(this.url + "/titre/" + titre, this.httpOptions);
  }
  add(musique: any): Observable<Musique> {
    return this.http.post<Musique>(this.url, musique, this.httpOptions);
  }
  // api Spotify
  searchOne(requette: string): Observable<any> {
    return this.http.get("https://api.spotify.com/v1/search?type=track&q=" + requette + "&market=FR", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token.access_token
      })
    });
  }
  getStyle(requette: string): Observable<any> {
    return this.http.get("https://api.spotify.com/v1/recommendations?seed_genres=" + requette + "&market=FR", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token.access_token
      })
    });
  }
  getAccessToken(): Observable<any> {
    return this.http.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', this.httpOptions2);
  }
}
