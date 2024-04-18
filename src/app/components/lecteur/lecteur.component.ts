import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';

@Component({
  selector: 'app-lecteur',
  templateUrl: './lecteur.component.html',
  styleUrl: './lecteur.component.scss'
})
export class LecteurComponent implements OnInit {
  musiqueEnCours: Musique | null = null;
  playflag = false;

  constructor() { }

  ngOnInit(): void {}
  play(): void {
    this.playflag = !this.playflag;
  }
  stop(): void {
    this.playflag = false;
    this.musiqueEnCours = null;
  }
}
