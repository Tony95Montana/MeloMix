import { Component, OnInit } from '@angular/core';
import { Artiste } from 'src/app/model/Artiste';
import { Musique } from 'src/app/model/Musique';
import { Style } from 'src/app/model/Style';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';
import { StyleService } from 'src/app/service/style.service';
import { ArtisteComponent } from '../artiste/artiste.component';
import { StyleComponent } from '../style/style.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listMusiques: Musique[] = [];
  listStyles: Style[] = [];

  constructor(private readonly dialog: Dialog, private readonly lectureService: LectureService, private readonly musiqueService: MusiqueService, private readonly styleService: StyleService) { }

  ngOnInit(): void {
    this.musiqueService.getAll().subscribe(res => {
      this.listMusiques = res;
    });
    this.styleService.getAll().subscribe(res => {
      this.listStyles = res;
    });
  }
  lecture(musique: Musique): void {
    this.lectureService.updateNumero(musique.id.toString());
  }
  openArtiste(artiste: Artiste): void {
    this.dialog.open(ArtisteComponent, {
      maxHeight: '80vh',
      width: '80vw',
      panelClass: ['bg-white', 'rounded', 'p-3'],
      data: { artiste: artiste }
    });
  }
  openStyle(style: Style): void {
    this.dialog.open(StyleComponent, {
      maxHeight: '80vh',
      width: '80vw',
      panelClass: ['bg-white', 'rounded', 'p-3'],
      data: { style: style }
    });
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
