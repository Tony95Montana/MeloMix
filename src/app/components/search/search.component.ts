import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Artiste } from 'src/app/model/Artiste';
import { Musique } from 'src/app/model/Musique';
import { ArtisteService } from 'src/app/service/artiste.service';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  listResult: Musique[] = [];
  state$!: Observable<object>;

  constructor(private readonly artisteService: ArtisteService, private readonly lectureService: LectureService, private readonly rooter: Router, private readonly activatedRoute: ActivatedRoute, private readonly musiqueService: MusiqueService) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(($state: any) => {
      const state = $state.query;
      if(state) {
        this.musiqueService.getAccessToken().subscribe(tokken => {
          this.musiqueService.access_token = tokken;
          this.musiqueService.searchOne("gomorra").subscribe(res => {
            res.tracks.items.forEach((element: any) => {
              this.listResult.push({
                id: 0,
                titre: element.name,
                pochette: element.album.images[0].url,
                duree: Math.floor(element.duration_ms/1000),
                annee: parseInt(element.album.release_date.split('-')[0]),
                Artiste: { id: 0, nom: element.artists[0].name, Musique: [], image: '' },
                Style: { id: 1, nom: "", Musique: [], image: "" }
              });
            });
          });
        });
      } else this.rooter.navigateByUrl('');
    });
  }
  open(musique: Musique): void {
    this.musiqueService.getOneByName(musique.titre).subscribe(res => {
      if (res?.titre === musique.titre) {
        this.musiqueService.getOneByName(musique.titre).subscribe(res => {
          musique = res;
          this.lectureService.updateNumero(musique.id.toString());
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
            this.lectureService.updateNumero(musique.id.toString());
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
              this.lectureService.updateNumero(musique.id.toString());
            });
          }
        });
      }
    });
  }
  convert(secondes: number): string {
    let minute = 0;
    let seconde = 0;
    let heure = 0;
    let res = "";
    if (secondes >= 3600) {
      heure = Math.floor(secondes/60/60);
      minute = Math.floor(secondes/60);
      seconde = secondes%60;
    } else {
      minute = Math.floor(secondes/60);
      seconde = secondes%60;
    }
    if (heure != 0) res += heure + ":";
    res += (minute.toString().length == 1) ? "0" + minute + ":" : minute + ":";
    res += (seconde.toString().length == 1) ? "0" + seconde : seconde;
    return res;
  }
}
