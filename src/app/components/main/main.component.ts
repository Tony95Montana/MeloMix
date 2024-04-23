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

  constructor(private readonly renderer: Renderer2, private readonly dialog: Dialog, private readonly lectureService: LectureService, private readonly musiqueService: MusiqueService, private readonly styleService: StyleService) { }

  ngOnInit(): void {
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
