import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artiste } from '../model/Artiste';

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {
  url = "http://localhost:3000/artistes";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) { }

  getOne(id: number): Observable<Artiste> {
    return this.http.get<Artiste>(this.url + "/" + id, this.httpOptions);
  }
  add(artiste: Artiste): Observable<Artiste> {
    return this.http.post<Artiste>(this.url, artiste, this.httpOptions);
  }
}
