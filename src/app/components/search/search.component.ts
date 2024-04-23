import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Musique } from 'src/app/model/Musique';
import { MusiqueService } from 'src/app/service/musique.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  listResult: Musique[] = [];
  state$!: Observable<object>;

  constructor(private readonly rooter: Router, private readonly activatedRoute: ActivatedRoute, private readonly musiqueService: MusiqueService) { }

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
                duree: element.duration_ms,
                annee: parseInt(element.album.release_date.split('-')[0]),
                Artiste: { id: 0, nom: element.artists[0].name, Musique: [], image: '' },
                Style: { id: 0, nom: "", Musique: [], image: "" }
              });
            });
          });
        });
      } else this.rooter.navigateByUrl('');
    });
  }
}
