import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '../model/Playlist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  url = "http://localhost:3000/Playlist";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private readonly http: HttpClient) { }

  getAllByUser(id_utilisateur: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.url, this.httpOptions);
  }
  add(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.url, playlist, this.httpOptions);
  }
}
