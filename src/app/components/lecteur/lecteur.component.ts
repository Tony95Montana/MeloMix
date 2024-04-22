import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';

@Component({
  selector: 'app-lecteur',
  templateUrl: './lecteur.component.html',
  styleUrl: './lecteur.component.scss'
})
export class LecteurComponent implements OnInit {
  numero$ = this.lectureService.numero$
  musiqueEnCours: Musique = {
    id: 0,
    titre: "",
    annee: 0,
    duree: 0,
    pochette: "",
    Artiste: { id: 0, nom: "", image: "", Musique: [] },
    Style: { id: 0, nom: "", image: "", Musique: [] }
  };
  playflag = false;

  constructor(private readonly lectureService: LectureService, private readonly musiqueService: MusiqueService) { }

  ngOnInit(): void {
    this.numero$.subscribe(id => {
      if (parseInt(id) != 0) {
        this.musiqueService.getOne(id).subscribe(res => {
          this.musiqueEnCours = res;
        });
      }
    });
  }
  play(): void {
    this.playflag = !this.playflag;
  }
  stop(): void {
    this.lectureService.clear();
    this.playflag = false;
    this.musiqueEnCours = {
      id: 0,
      titre: "",
      annee: 0,
      duree: 0,
      pochette: "",
      Artiste: { id: 0, nom: "", image: "", Musique: [] },
      Style: { id: 0, nom: "", image: "", Musique: [] }
    };
  }
  convert(secondes: number): string {
    let minute = 0;
    let seconde = 0;
    let heure = 0;
    let res = "";
    if (secondes >= 3600) {
      heure = secondes/60/60;
      minute = secondes/60;
      seconde = secondes%60;
    } else {
      minute = secondes/60;
      seconde = secondes%60;
    }
    if (heure != 0) res += heure + ":";
    res += (minute.toString().length == 1) ? "0" + minute + ":" : minute + ":";
    res += (seconde.toString().length == 1) ? "0" + seconde : seconde;
    return res;
  }
}
