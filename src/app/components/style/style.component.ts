import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Artiste } from 'src/app/model/Artiste';
import { Musique } from 'src/app/model/Musique';
import { Style } from 'src/app/model/Style';
import { ArtisteService } from 'src/app/service/artiste.service';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class StyleComponent implements OnInit {
  style: Style;
  listMusique: Musique[] = [];

  constructor(private readonly artisteService: ArtisteService, private readonly musiqueService: MusiqueService, private readonly lectureService: LectureService, private readonly dialogRef: DialogRef) {
    this.style = dialogRef.config.data.style;
  }

  ngOnInit(): void {
    this.musiqueService.getAccessToken().subscribe(res => {
      this.musiqueService.access_token = res;
      this.musiqueService.getStyle(this.style.nom.toLocaleLowerCase()).subscribe(res => {
        if (this.style.nom.toLocaleLowerCase() == 'rap') this.listMusique = this.style.Musique;
        else {
          res.tracks.forEach((element: any) => {
            this.listMusique.push({
              id: 0,
              titre: element.name,
              pochette: element.album.images[0].url,
              duree: Math.floor(element.duration_ms / 1000),
              annee: parseInt(element.album.release_date.split('-')[0]),
              data: element.preview_url,
              Artiste: { id: 0, nom: element.artists[0].name, Musique: [], image: '' },
              Style: this.style
            });
          });
        }
      });
    });
  }
  open(musique: Musique, lecture?: boolean): void {
    this.musiqueService.getOneByName(musique.titre).subscribe(res => {
      if (res?.titre === musique.titre) {
        this.musiqueService.getOneByName(musique.titre).subscribe(res => {
          musique = res;
          if (!lecture) this.lectureService.updateNumero(musique.id.toString());
        });
      } else {
        this.artisteService.getOneByName(musique.Artiste.nom).subscribe(result => {
          if (result != null) {
            const res = {
              id: musique.id,
              titre: musique.titre,
              pochette: musique.pochette,
              annee: musique.annee,
              duree: musique.duree,
              Style: musique.Style.id,
              Artiste: result.id
            }
            this.musiqueService.add(res).subscribe(() => {});
            if (!lecture) this.lectureService.updateNumero(musique.id.toString());
          } else {
            const artiste: Artiste = {
              id: 0,
              nom: musique.Artiste.nom,
              image: musique.Artiste.image,
              Musique: []
            };
            this.artisteService.add(artiste).subscribe(result => {
              const res = {
                id: musique.id,
                titre: musique.titre,
                pochette: musique.pochette,
                annee: musique.annee,
                duree: musique.duree,
                Style: musique.Style.id,
                Artiste: result.id
              }
              this.musiqueService.add(res).subscribe(() => {});
              if (!lecture) this.lectureService.updateNumero(musique.id.toString());
            });
          }
        });
      }
    });
  }
  closeClick(): void {
    this.dialogRef.close();
  }
  convert(secondes: number): string {
    let minute = 0;
    let seconde = 0;
    let heure = 0;
    let res = "";
    if (secondes >= 3600) {
      heure = Math.floor(secondes / 60 / 60);
      minute = Math.floor(secondes / 60);
      seconde = secondes % 60;
    } else {
      minute = Math.floor(secondes / 60);
      seconde = secondes % 60;
    }
    if (heure != 0) res += heure + ":";
    res += (minute.toString().length == 1) ? "0" + minute + ":" : minute + ":";
    res += (seconde.toString().length == 1) ? "0" + seconde : seconde;
    return res;
  }
}
