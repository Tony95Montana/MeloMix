import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';
import { MusiqueService } from 'src/app/service/musique.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listMusiques: Musique[] = [];

  constructor(private readonly musiqueService: MusiqueService) { }

  ngOnInit(): void {
    this.listMusiques.push({titre: "test", annee: 2024, duree: 23000, id: 1, id_Artiste: 1, id_style: 2});
  }
}
