import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musique } from '../model/Musique';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {
  url = "http://localhost:3000/musique";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Musique[]> {
    return this.http.get<Musique[]>(this.url, this.httpOptions);
  }
}
