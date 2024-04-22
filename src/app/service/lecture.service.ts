import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  numeroSubject$ = new BehaviorSubject("0")
  numero$: Observable<string> = this.numeroSubject$.asObservable();

  updateNumero(newNumero: string): void {
    this.numeroSubject$.next(newNumero);
  }
  clear(): void {
    this.numeroSubject$.next("0");
  }
}