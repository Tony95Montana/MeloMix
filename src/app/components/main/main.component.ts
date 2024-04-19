import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';
import { Style } from 'src/app/model/Style';
import { MusiqueService } from 'src/app/service/musique.service';
import { StyleService } from 'src/app/service/style.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listMusiques: Musique[] = [];
  listStyles: Style[] = [];

  constructor(private readonly musiqueService: MusiqueService, private readonly styleService: StyleService) { }

  ngOnInit(): void {
    this.musiqueService.getAll().subscribe(res => {
      this.listMusiques = res;
    });
    // this.listMusiques.push({titre: "test", annee: 2024, duree: 23000, id: 1, id_Artiste: 1, id_style: 2});
    this.styleService.getAll().subscribe(res => {
      this.listStyles = res;
    });
  }
}
