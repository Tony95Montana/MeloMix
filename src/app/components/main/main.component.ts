import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Artiste } from 'src/app/model/Artiste';
import { Musique } from 'src/app/model/Musique';
import { Style } from 'src/app/model/Style';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';
import { StyleService } from 'src/app/service/style.service';
import { ArtisteComponent } from '../artiste/artiste.component';
import { StyleComponent } from '../style/style.component';
import { Dialog } from '@angular/cdk/dialog';
import { AddToPlaylistComponent } from '../forms/add-to-playlist/add-to-playlist.component';
import { ArtisteService } from 'src/app/service/artiste.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listMusiques: Musique[] = [];
  listStyles: Style[] = [];
  flagMenu = false;
  flagBody = false;
  @ViewChildren("miniMenu") miniMenu!: QueryList<ElementRef>;

  constructor(private readonly artisteService: ArtisteService, private readonly renderer: Renderer2, private readonly dialog: Dialog, private readonly lectureService: LectureService, private readonly musiqueService: MusiqueService, private readonly styleService: StyleService) { }

  ngOnInit(): void {
    // this.remplir();
    const body = document.getElementsByClassName("body")[0];
    this.renderer.listen(body, 'click', () => {
      if (this.flagMenu && !this.flagBody) this.flagBody = true;
      else if (this.flagMenu && this.flagBody) this.clearMenu();
    });
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
  addPlaylist(musique: Musique): void {
    this.dialog.open(AddToPlaylistComponent, {
      maxHeight: '80vh',
      width: '40vw',
      panelClass: ['bg-white', 'rounded', 'p-3'],
      data: { musique: musique }
    });
  }
  remplir() { // fonction temporaire pour remplir database
    const list = ['gazo', 'sch', 'ninho', 'djadja dinaz'];
    const listArtiste: Artiste[] = [];
    this.musiqueService.getAccessToken().subscribe(tokken => {
      this.musiqueService.access_token = tokken;
      list.forEach(artiste => {
        this.musiqueService.searchOne(artiste).subscribe(res => {
          res.tracks.items.forEach((element: any) => {
            const unArtiste = {
              id: 0,
              nom: element.artists[0].name,
              image: element.album.images[0].url,
              Musique: []
            };
            this.artisteService.add(unArtiste).subscribe(artisteF => {
              listArtiste.push(artisteF);
              const musique = {
                id: 0,
                titre: element.name,
                pochette: element.album.images[0].url,
                duree: Math.floor(element.duration_ms / 1000),
                annee: parseInt(element.album.release_date.split('-')[0]),
                Artiste: artisteF.id,
                Style: 1,
              };
              this.musiqueService.add(musique).subscribe(res => {
                console.log(res);
              });
            }, err => {
              if (listArtiste.filter(x => x.nom == element?.artists[0]?.name)[0]?.id) {
                const musique = {
                  id: 0,
                  titre: element.name,
                  pochette: element.album.images[0].url,
                  duree: Math.floor(element.duration_ms / 1000),
                  annee: parseInt(element.album.release_date.split('-')[0]),
                  Artiste: listArtiste.filter(x => x.nom == element.artists[0].name)[0].id,
                  Style: 1,
                };
                this.musiqueService.add(musique).subscribe(res => {
                  console.log(res);
                });
              }
            });
          });
        });
      });
    });
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
  clearMenu(): void {
    this.miniMenu.forEach(element => {
      element.nativeElement.style.display = "none";
    });
    this.flagMenu = false;
    this.flagBody = false;
  }
  openMenu(index: number): void {
    const menu = this.miniMenu.get(index)?.nativeElement;
    if (this.flagMenu) menu.style.display = "none";
    else menu.style.display = "block";
    this.flagMenu = !this.flagMenu;
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
