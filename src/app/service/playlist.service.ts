import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from '../model/Playlist';
import { Observable } from 'rxjs';
import { Musique } from '../model/Musique';

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
  getOne(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(this.url + "/" + id, this.httpOptions);
  }
  add(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.url, playlist, this.httpOptions);
  }
  addMusiqueTo(musique: Musique, playlist: Playlist): Observable<Playlist> {
    playlist.list_musique += musique.id + ",";
    return this.http.post<Playlist>(this.url, playlist, this.httpOptions);
  }
  delMusiqueTo(musique: Musique, playlist: Playlist): Observable<Playlist> {
    const newPlaylist = playlist.list_musique.replace(musique.id + ",", '');
    playlist.list_musique = newPlaylist;
    return this.http.post<Playlist>(this.url, playlist, this.httpOptions);
  }
}
