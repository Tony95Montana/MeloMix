import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Style } from '../model/Style';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  url = "http://localhost:3000/Styles";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private readonly http: HttpClient) { }
  
  getAll(): Observable<Style[]> {
    return this.http.get<Style[]>(this.url, this.httpOptions);
  }
}
